import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // CSS file import karna zaroori hai

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // API Key load karo (Yeh .env file se aayega)
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

  // Auto scroll effect
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Check if API key exists. Agar nahi toh error screen dikhao.
  if (!API_KEY) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
        textAlign: 'center',
        background: '#FFFFFF'
      }}>
        <h1 style={{ fontSize: '48px' }}>🔑</h1>
        <h2>API Key Missing!</h2>
        <p>Please add **REACT_APP_GEMINI_API_KEY** in your project's **.env** file.</p>
        <p>Then restart the server.</p>
      </div>
    );
  }

  // API call function (Direct REST API)
  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      text: input,
      sender: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // FIX: Changed model from 'gemini-pro' to 'gemini-2.5-flash' for stable v1 endpoint
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: userInput
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      // Error handling for API response
      if (data.error) {
        throw new Error(data.error.message || 'API Error');
      }
      
      // Response ko safely extract karte hain
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response. The response might have been blocked due to safety settings.";

      const botMessage = {
        text: botReply,
        sender: 'bot',
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      
      let errorText = `❌ Error: ${error.message}\n\nPlease check your network connection and API key status.`;
      
      // Specific Error Messages for better debugging
      if (error.message.includes('API_KEY_INVALID')) {
        errorText = '❌ Invalid API Key! Please check your key in the .env file.';
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        errorText = '❌ API Not Activated or Model Error! Please visit https://aistudio.google.com/ and run a test prompt to activate your key. If the error persists, there might be a billing or model access issue.';
      } else if (error.message.includes('403')) {
        errorText = '❌ API Access Denied! Please ensure the "Generative Language API" is enabled for your project.';
      }
      
      const errorMessage = {
        text: errorText,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Enter key press handling (Shift+Enter se new line, sirf Enter se send)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <button className="new-chat-btn">
          <span className="plus-icon">+</span>
          New chat
        </button>
        
        <div className="chat-history">
          <div className="history-item active">
            <span className="chat-icon">💬</span>
            <span className="chat-title">Personal Assistant</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">👤</div>
            <span>User</span>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-content">
        {/* Header */}
        <div className="chat-header">
          <div className="model-selector">
            <span className="model-name">Gemini 2.5 Flash</span> {/* Name updated here too */}
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {messages.length === 0 ? (
            // Welcome Screen
            <div className="welcome-screen">
              <div className="logo">
                <div className="gemini-logo">✨</div>
              </div>
              <h1>How can I help you today?</h1>
              
              <div className="suggestion-cards">
                <div className="suggestion-card" onClick={() => setInput('Tell me a joke')}>
                  <div className="card-icon">😄</div>
                  <p>Tell me a joke</p>
                </div>
                <div className="suggestion-card" onClick={() => setInput('What is React?')}>
                  <div className="card-icon">⚛️</div>
                  <p>Explain React</p>
                </div>
                <div className="suggestion-card" onClick={() => setInput('Write a short poem')}>
                  <div className="card-icon">✍️</div>
                  <p>Write a poem</p>
                </div>
                <div className="suggestion-card" onClick={() => setInput('Help me with coding')}>
                  <div className="card-icon">💻</div>
                  <p>Coding help</p>
                </div>
              </div>
            </div>
          ) : (
            // Messages List
            <div className="messages-list">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
                >
                  <div className="message-wrapper">
                    <div className="message-avatar">
                      {msg.sender === 'user' ? '👤' : '✨'}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <div className="message-row bot-row">
                  <div className="message-wrapper">
                    <div className="message-avatar">✨</div>
                    <div className="message-content">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Auto Scroll Reference */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            <textarea
              placeholder="Message Gemini..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="message-input"
              disabled={isLoading}
              rows="1" // Start with 1 row height
            />
            <button 
              onClick={handleSend} 
              className="send-btn"
              disabled={isLoading || !input.trim()}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M7 11L12 6L17 11M12 18V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <p className="input-footer">
            Gemini can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;