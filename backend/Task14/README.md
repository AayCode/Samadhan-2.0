# Auth Backend (Node.js + Express + JWT)

This is a simple authentication backend built with **Node.js**, **Express**, **JWT**, **bcryptjs**, and **Zod** for validation.  
It supports **user registration, login, and authentication** using JWT tokens.

---

## 🚀 Features
- Register a new user with validation (name, email, strong password).
- Login with email and password.
- JWT-based authentication (1-hour expiry).
- Protected route to fetch the logged-in user's profile.
- In-memory data store (no database).

---

## 🛠️ Tech Stack
- Node.js
- Express.js
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- Zod (validation)
- dotenv (environment variables)

---

## 📦 Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd backend-auth
Install dependencies:

sh
Copy code
npm install
Create a .env file:

env
Copy code
PORT=5000
JWT_SECRET=super-secret-change-me
JWT_EXPIRES_IN=1h
CORS_ORIGIN=http://localhost:5173
Start the server:

sh
Copy code
node server.js
The server will run at:
http://localhost:5000

🔑 API Endpoints
1. Register a new user
http
Copy code
POST /api/auth/register
Content-Type: application/json
Request Body:

json
Copy code
{
  "name": "Aaysha",
  "email": "aaysha@example.com",
  "password": "StrongPass123"
}
Response:

json
Copy code
{
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "name": "Aaysha",
    "email": "aaysha@example.com",
    "createdAt": "2025-09-03T13:44:30.227Z"
  }
}
2. Login
http
Copy code
POST /api/auth/login
Content-Type: application/json
Request Body:

json
Copy code
{
  "email": "aaysha@example.com",
  "password": "StrongPass123"
}
Response:

json
Copy code
{
  "token": "<jwt_token>",
  "user": {
    "id": 1,
    "name": "Aaysha",
    "email": "aaysha@example.com",
    "createdAt": "2025-09-03T13:44:30.227Z"
  }
}
3. Get current user (Protected)
http
Copy code
GET /api/me
Authorization: Bearer <jwt_token>
Response:

json
Copy code
{
  "user": {
    "id": 1,
    "name": "Aaysha",
    "email": "aaysha@example.com",
    "createdAt": "2025-09-03T13:44:30.227Z"
  }
}
⚠️ Notes
All data is stored in memory (it resets when server restarts).
