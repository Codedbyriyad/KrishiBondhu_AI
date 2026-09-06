# 🌾 KrishiBondhu.AI

> **Your AI-powered farming companion**

KrishiBondhu.AI is an AI-powered agricultural assistance platform designed to help farmers make smarter and more informed farming decisions.

The platform combines **Artificial Intelligence, agricultural knowledge, weather information, crop guidance, disease detection, and fertilizer recommendations** into one simple and farmer-friendly application.

---

## 🚀 Project Overview

Farmers often face difficulties when identifying crop diseases, choosing suitable fertilizers, understanding weather conditions, and getting reliable agricultural guidance.

**KrishiBondhu.AI** aims to solve these problems by providing an intelligent digital farming assistant.

The long-term vision is to provide farmers with:

* 🤖 AI-powered agricultural assistance
* 🌿 Crop disease detection
* 🌦 Weather information
* 🧪 Fertilizer recommendations
* 🌾 Crop cultivation guidance
* 📜 Personalized activity/history
* 👤 User accounts and personalized recommendations

---

## ✨ Current Features

### 🤖 AI Agricultural Chat

Users can communicate with an AI-powered agricultural assistant and ask questions related to:

* Crop cultivation
* Plant problems
* Farming practices
* Fertilizer usage
* Crop diseases
* Agricultural recommendations

The AI Chat feature is currently connected to the backend AI service.

### 🏠 Dashboard

The dashboard provides a centralized interface for accessing the major KrishiBondhu.AI features.

Planned dashboard sections include:

* Weather overview
* Quick actions
* Recent activities
* Crop information
* AI recommendations
* Farming tips

### 🌿 Disease Scanner

A planned AI-powered feature that will allow users to analyze crop/plant images and identify possible diseases.

**Status:** 🚧 In Development

### 🌦 Weather

The weather module will provide useful weather information for agricultural decision-making.

**Status:** 🚧 In Development

### 🧪 Fertilizer Recommendation

The fertilizer recommendation system will provide recommendations based on crop and farming-related information.

**Status:** 🚧 In Development

### 🌾 Crop Guide

A crop knowledge system providing information about cultivation, growing conditions, care, and harvesting.

**Status:** 🚧 In Development

### 📜 History

Users will be able to view their previous AI consultations, disease scans, and recommendations.

**Status:** 🚧 Planned

---

# 🏗️ Architecture

KrishiBondhu.AI is designed with a modular architecture so that the frontend and backend can evolve independently.

```text
                    KrishiBondhu.AI
                           │
              ┌────────────┴────────────┐
              │                         │
        React Frontend             FastAPI Backend
              │                         │
              │                    AI Services
              │                         │
              │                  External APIs
              │                         │
              └────────────┬────────────┘
                           │
                       PostgreSQL
```

### Frontend

```text
React
TypeScript
Vite
Tailwind CSS
```

### Backend

```text
Python
FastAPI
SQLAlchemy
PostgreSQL
```

### AI

```text
OpenAI API
AI-powered agricultural assistance
Future computer vision / disease detection
```

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Lucide React

## Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Pydantic

## AI & APIs

* OpenAI API
* Weather APIs
* Future agricultural / crop APIs
* Future computer vision models

## Development

* Git
* GitHub
* VS Code

---

# 📁 Project Structure

```text
KrishiBondhu_AI/
│
├── backend/
│   ├── app/
│   │   ├── core/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── layouts/
│   └── ...
│
├── public/
├── package.json
├── vite.config.ts
├── README.md
└── .gitignore
```

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Codedbyriyad/KrishiBondhu_AI.git
```

```bash
cd KrishiBondhu_AI
```

---

# 🎨 Frontend Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🐍 Backend Setup

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Windows

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
pip install -r requirements.txt
```

Run the FastAPI server:

```powershell
uvicorn app.main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

# 🔐 Environment Variables

Never commit API keys or secrets to GitHub.

Create a `.env` file inside the backend directory.

Example:

```env
OPENAI_API_KEY=your_api_key_here

DATABASE_URL=your_database_url_here

CORS_ORIGINS=http://localhost:5173
```

For the frontend, use environment variables for backend configuration.

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Make sure `.env` files are included in `.gitignore`.

---

# 🔌 API Integration

The frontend communicates with the backend through a dedicated API service layer.

```text
React UI
   ↓
API Service
   ↓
FastAPI
   ↓
Service Layer
   ↓
AI / Database / External APIs
```

This separation makes the application easier to maintain and scale.

---

# 🧠 AI Chat Flow

The current AI Chat architecture follows this general flow:

```text
User
 ↓
React AI Chat UI
 ↓
Frontend API Service
 ↓
FastAPI Chat Router
 ↓
Chat Service
 ↓
OpenAI Service
 ↓
AI Response
 ↓
FastAPI
 ↓
React UI
```

This architecture allows the AI provider to be changed or extended without heavily modifying the frontend.

---

# 🗺️ Development Roadmap

## Phase 1 — Foundation

* [x] Project setup
* [x] Frontend architecture
* [x] Backend architecture
* [x] Dashboard foundation
* [x] AI Chat interface
* [x] FastAPI Chat endpoint
* [x] OpenAI service integration

## Phase 2 — Core Agricultural Features

* [ ] Disease Scanner
* [ ] Weather Integration
* [ ] Fertilizer Recommendation
* [ ] Crop Guide

## Phase 3 — User System

* [ ] User registration
* [ ] User login
* [ ] JWT authentication
* [ ] User profile
* [ ] User-specific history

## Phase 4 — Data & Intelligence

* [ ] PostgreSQL integration
* [ ] Agricultural knowledge base
* [ ] Personalized recommendations
* [ ] Disease detection model
* [ ] Recommendation improvements

## Phase 5 — Production

* [ ] Frontend deployment
* [ ] Backend deployment
* [ ] Production database
* [ ] Environment configuration
* [ ] Security improvements
* [ ] Performance optimization
* [ ] Monitoring

---

# 🔒 Security Principles

KrishiBondhu.AI follows several important security principles:

* API keys must never be exposed in frontend code.
* Secrets must be stored in environment variables.
* Backend validation should be used for API requests.
* Authentication should be handled by the backend.
* Database access should remain server-side.
* Production CORS configuration should be restricted.
* Sensitive configuration must never be committed to Git.

---

# 🌱 Vision

The goal of KrishiBondhu.AI is not simply to create another chatbot.

The long-term vision is to build a **complete AI-powered digital farming companion** that can help farmers throughout the agricultural decision-making process.

```text
        Farmer
           │
           ▼
    KrishiBondhu.AI
           │
    ┌──────┼──────┐
    ▼      ▼      ▼
   AI    Weather  Crop
  Chat            Guide
    │      │       │
    ├──────┼───────┤
    ▼      ▼       ▼
 Disease  Fertilizer
 Scanner  Recommendation
           │
           ▼
      Better Decisions
           │
           ▼
     Smarter Farming 🌾
```

---

# 🤝 Contribution

Contributions, suggestions, and ideas are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Make your changes.
4. Commit your changes.

```bash
git commit -m "Add your feature"
```

5. Push the branch.

```bash
git push origin feature/your-feature
```

6. Open a Pull Request.

---

# 📄 License

This project is currently under development.

License information will be added as the project reaches its production release.

---

# 👨‍💻 Developer

**Riyad Mahmud**

GitHub:

https://github.com/Codedbyriyad

Project:

https://github.com/Codedbyriyad/KrishiBondhu_AI

---

## ⭐ KrishiBondhu.AI

**AI for smarter farming. 🌾🤖**

Built to make agricultural knowledge and intelligent farming assistance more accessible.
