# 🌿 PlantAI - AI Powered Plant Identification & Care Assistant

PlantAI is a full-stack web application that helps users identify plants from images using Google Gemini AI. After identifying a plant, users can view plant details, care instructions, and interact with an AI chatbot to ask plant-related questions.

---

## 🚀 Features

- 🌱 AI-based Plant Identification
- 📸 Upload image or capture from camera
- 🤖 Google Gemini AI integration
- 💧 Plant care recommendations
- ☀️ Sunlight requirements
- 🌾 Fertilizer suggestions
- ⚠️ Common plant problems
- 💬 AI Plant Chat Assistant
- 🔒 JWT Authentication
- 👤 User Login & Registration
- 🗄 MongoDB Database
- ⏳ Automatic deletion of plant scans after 24 hours

---

## 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- Lucide Icons

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Multer

### AI

- Google Gemini 2.5 Flash API

---

## 📁 Project Structure

```
PlantAI/
│
├── Frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.tsx
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── models/
│   ├── validators/
│   └── server.ts
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/PlantAI.git
```

---

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret

GEMINI_API_KEY=your_gemini_api_key
```

Run backend

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at

```
http://localhost:8080
```

Backend runs at

```
http://localhost:5000
```

---

## 📸 Application Flow

```
User Login
      │
      ▼
Upload Plant Image
      │
      ▼
Backend receives image
      │
      ▼
Gemini AI identifies plant
      │
      ▼
Plant Details Page
      │
      ▼
Ask questions using AI Chat
      │
      ▼
Receive personalized plant care advice
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint |
|----------|----------------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| POST | /api/auth/verify-otp |

---

### Plant

| Method | Endpoint |
|----------|----------------|
| POST | /api/plant/identify |

---

### Chat

| Method | Endpoint |
|----------|----------------|
| POST | /api/chat/ask |

---

### User

| Method | Endpoint |
|----------|----------------|
| GET | /api/user/profile |

---

## 📷 Screens

- Login Page
- Register Page
- Dashboard
- Plant Identification
- Plant Details
- AI Chat

---

## 🔒 Security

- JWT Authentication
- Protected Routes
- Image Validation
- File Size Restriction
- Secure Environment Variables

---

## 🚧 Future Improvements

- Plant Disease Detection
- Weather-based Plant Care
- Plant Reminder Notifications
- Save Favorite Plants
- Scan History
- Voice Assistant
- Multi-language Support
- Community Discussion Forum

---

## 👨‍💻 Author

Awantika Singh
Backend repository is separately in my repositories in future i will merge both frontend and backend repo.
