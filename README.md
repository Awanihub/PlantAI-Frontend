# 🌱 PlantAI Frontend

PlantAI is an AI-powered plant care assistant frontend built using React and TypeScript.

The application provides users with an interactive interface to identify plants using AI, manage their personal garden, create plant care reminders, learn about plant care, and communicate with an AI plant assistant.

This repository contains only the frontend implementation.

---

# 🚀 Features

## 🌿 AI Plant Identification

Users can upload plant images and get AI-generated plant information.

Features:

- Upload plant image
- Preview uploaded image
- Display AI identification results
- Show:
  - Plant name
  - Scientific name
  - Description
  - Watering requirements
  - Sunlight requirements
  - Fertilizer suggestions
  - Common problems
  - Care instructions

---

## 🌱 Plant Details

After identification, users can view detailed information about the plant.

Includes:

- Plant image
- Scientific classification
- Care requirements
- AI-generated recommendations
- Ask Plant AI feature

---

## 🌳 Personal Garden

Users can manage their saved plants.

Features:

- View saved plants
- Display plant information
- Remove plants from garden

---

## ⏰ Plant Care Reminders

Users can create and manage plant care reminders.

Supported activities:

- Watering
- Fertilizing
- Pruning
- Repotting
- Misting

Features:

- Add reminder
- Mark reminder as completed
- Delete reminder

---

## 🤖 Plant AI Chat

Users can ask questions related to their plants.

Examples:

```
How often should I water this plant?

Why are my leaves turning yellow?

Which fertilizer should I use?
```

---

## 📚 Learn & Grow

Educational section for improving plant knowledge.

Topics include:

- Plant care basics
- Pest management
- Pruning and propagation
- Common plant problems

Also includes AI-powered plant questions.

---

# 🛠️ Tech Stack

## Frontend Technologies

- React.js
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Shadcn UI
- Lucide React Icons

---

# 📂 Project Structure

```
PlantAI-Frontend
│
├── src
│   │
│   ├── components
│   │   └── UI Components
│   │
│   ├── pages
│   │   ├── Dashboard.tsx
│   │   ├── PlantIdentify.tsx
│   │   ├── PlantDetails.tsx
│   │   ├── Garden.tsx
│   │   ├── Reminders.tsx
│   │   ├── Learn.tsx
│   │   ├── PlantChat.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   │
│   ├── context
│   │   └── AuthContext.tsx
│   │
│   ├── hooks
│   │
│   ├── App.tsx
│   └── main.tsx
│
└── package.json
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/Awanihub/PlantAI-Frontend.git
```

Navigate into project:

```bash
cd PlantAI-Frontend
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run Application

Start development server:

```bash
npm run dev
```

Application runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication

The frontend uses JWT-based authentication.

Authentication flow:

```
User Login
     |
     |
Backend validates credentials
     |
     |
JWT Token Generated
     |
     |
Stored in Browser Local Storage
     |
     |
Used for Protected API Requests
```

---

# 🔗 Backend Integration

Frontend communicates with the PlantAI backend through REST APIs.

Backend Repository:

```
PlantAI-Backend
```

Main API features:

- Authentication
- Plant identification
- Garden management
- Reminder management
- AI chat
- Learning assistant

---

# 🖼️ Screenshots

(Add application screenshots here)

Example:

```
Dashboard
Plant Identification
Garden
Reminders
Learn Section
```

---

# 🌟 Future Improvements

- Mobile responsive improvements
- Push notifications
- Offline plant collection
- Plant growth tracking UI
- Weather-based plant recommendations
- Dark mode improvements

---

# 👨‍💻 Author

**Awantika Singh**

---

## License

This project is created for learning and development purposes.
