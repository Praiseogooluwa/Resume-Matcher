# Job Matcher – AI-Powered Job Search Web App

## 🔍 Project Overview

**Job Matcher** is a modern web application that helps users find job listings tailored to their skills and interests. It leverages the JSearch API on the backend and provides a responsive, interactive frontend for a seamless experience. 

This project was built with **Vite + React + TypeScript**, styled using **Tailwind CSS** and **shadcn/ui**, and is fully integrated with a custom backend API deployed on **Render**. The frontend is hosted on **Vercel** for fast and reliable access.

---

## 🚀 Live Demo

🌐 Frontend: ([https://your-vercel-link.vercel.app](https://job-matcher-rose.vercel.app/))  
🔗 Backend API (Render): [https://your-render-api-url.onrender.com](https://your-render-api-url.onrender.com)

---

## 🧠 Features

- 🔍 Job search powered by the **JSearch API**
- ⚡ Fast and modern frontend using **Vite + React + TypeScript**
- 🎨 Clean, customizable UI with **Tailwind CSS** and **shadcn/ui**
- 🔁 Dynamic job fetching using **React Query**
- 🌐 API integration with a **custom backend** (Node.js & Express)
- ☁️ Frontend deployed on **Vercel**, backend deployed on **Render**

---

## 🛠 Tech Stack

### Frontend
- **Vite**
- **React (v18)**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **React Router**
- **Zod** for validation
- **Radix UI** components

### Backend
- **Node.js** & **Express**
- **JSearch API** (via RapidAPI)
- **CORS** & **dotenv** for configuration
- Deployed on **Render**

---

## 📁 Project Structure

Matcher/
├── frontend/

│ ├── index.html

│ ├── src/

│ │ ├── components/

│ │ ├── pages/

│ │ ├── hooks/

│ │ └── main.tsx

│ └── vite.config.ts

├── backend/

│ ├── index.js

│ ├── routes/

│ └── services/

└── README.md


---

## 🔧 Getting Started Locally

### Prerequisites
- Node.js + npm (use [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed)

### Frontend Setup

``bash
# Clone the repository
git clone https://github.com/Praiseogooluwa/Resume-Matcher

# Navigate to frontend folder
cd Matcher/frontend

# Install dependencies
npm install

# Run development server
npm run dev

The app will be available at: http://localhost:8080

### Backend Setup
# Navigate to backend folder
cd ../backend

# Install dependencies
npm install

# Create .env file and add your RapidAPI Key
touch .env
# .env
RAPIDAPI_KEY=your_api_key_here

# Run backend server
node index.js

Backend will run at: http://localhost:5000

🌐 Deployment
Frontend is deployed on Vercel

Backend API is deployed on Render

Both services are connected seamlessly so that job search requests from the frontend go through your custom backend, which in turn queries the JSearch API.

<img width="2595" height="1137" alt="App_structure" src="https://github.com/user-attachments/assets/5ad6a27a-9b08-43bb-881a-3bee84bf0d4b" />


📬 Contact / Credits
Built with ❤️ by Isaiah Ogooluwa Bakare
Feel free to contribute or fork for personal use.
