# Gemini AI Chatbot - Personal Assistant

![Project Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Gemini%20API-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A simple, modern, and personal chatbot application built using **React** for the frontend and powered by the **Google Gemini 2.5 Flash API** for intelligent conversational responses.

## ✨ Features

* **Real-time Interaction:** Seamless chat interface for direct interaction with the Gemini model.
* **Secure API Handling:** Uses environment variables (`.env`) to securely load the API key.
* **Error Handling:** Custom error messages for common API issues (Key Missing, Activation required, etc.).
* **Responsive UI:** Clean and modern user interface that works well on both desktop and mobile devices.
* **Model:** Uses the highly efficient and fast **`gemini-2.5-flash`** model.

## ⚙️ Technologies Used

* **Frontend:** React (Create React App)
* **Styling:** Pure CSS (`App.css`)
* **AI Backend:** Google Gemini API (`gemini-2.5-flash`)
* **API Calls:** JavaScript's `fetch` (Direct REST API calls)

## 🚀 Setup Aur Run Kaise Karein (How to Setup and Run)

In steps ko follow karein, assuming aapke paas **Node.js** aur **npm** installed hai.

### 1. Repository Clone Karein

```bash
git clone [https://github.com/rahul-dewangan321/chatbot.git](https://github.com/rahul-dewangan321/chatbot.git)
cd chatbot
2. Dependencies Install Karein
Project folder mein saari zaroori packages install karein:

Bash

npm install
3. API Key Configure Karein
Ek .env file create karein project ke root directory mein aur apni Gemini API Key daalein:

REACT_APP_GEMINI_API_KEY="YOUR_API_KEY_HERE"
⚠️ Zaruri Note: Apni key ko hamesha secret rakhein aur .env file ko GitHub par kabhi push na karein (Yeh automaticlly .gitignore mein block ho jaati hai).

4. Project Run Karein
Application ko local server par start karein:

Bash

npm start
Application ab aapke browser mein http://localhost:3000 par open ho jaana chahiye.

📝 License
Yeh project MIT License ke tahat licensed hai.


---

Aapko bas **`README.md`** file ko is content se **replace** karna hai, aur **ek aakhri baar Git commit aur push** karna hai:

```bash
git add README.md
git commit -m "Update: Added project README file"
git push
