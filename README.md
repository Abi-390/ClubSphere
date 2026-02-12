# 🚀 ClubSphere

**Live App:** https://clubsphere-tau.vercel.app  
**Repository:** https://github.com/Abi-390/ClubSphere  

ClubSphere is a full-stack MERN community management platform that enables users to create clubs, manage events, and participate in structured threaded discussions with secure authentication and role-based access control.

This project is built using real-world architectural patterns and deployed in a production-like environment using Vercel (frontend) and Render (backend).

---

## 📌 Overview

ClubSphere solves a common problem in student organizations and communities:  
managing clubs, events, and discussions in a structured and scalable way.

This is not a simple CRUD demo app — it includes:

- Authentication & authorization
- Role-based logic
- Threaded discussion depth control
- Modular frontend service architecture
- Secure API communication
- Deployment-ready backend configuration

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JWT Authentication
- Custom middleware (auth, role validation)

### Deployment
- Frontend: Vercel  
- Backend: Render  
- Database: MongoDB Atlas  

---

## ✨ Core Features

### 🔐 Authentication System
- JWT-based login & registration
- Protected routes
- Token persistence via localStorage
- Automatic logout on 401

### 👥 Clubs
- Create, update, delete clubs
- Role-based club ownership logic
- Club-specific data segregation

### 📅 Events
- Create & manage events under specific clubs
- Event retrieval filtered by club
- Secure protected endpoints

### 💬 Threaded Discussions
- Root-level discussions
- Reply system with depth control (max depth = 2)
- Club-scoped discussions (no cross-club leakage)
- Author population with username
- Timestamped threads

### 🧱 Clean Architecture
- Service layer abstraction on frontend (`api.service.js`)
- Modular controllers and route separation on backend
- Mongoose schema relationships
- Environment-based API configuration

---

## 📂 Project Structure

### Frontend
client/
├── pages/
├── components/
├── context/
├── services/
├── App.jsx
└── main.jsx


### Backend


server/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── config/
└── app.js


---

## 🔄 API Structure (Sample)



POST /api/auth/register
POST /api/auth/login
GET /api/auth/me

POST /api/clubs
GET /api/clubs/:id

POST /api/events/create
GET /api/events/get

POST /api/discussions/creatediscussion
POST /api/discussions/replytodiscussion/:id
GET /api/discussions/getdiscussions/:clubId
GET /api/discussions/getreplies/:id


---

