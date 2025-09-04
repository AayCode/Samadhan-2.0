📝 To-Do App (React + Node.js Backend)

A simple To-Do List application built with React (frontend) and Node.js/Express (backend).
This app allows users to add, edit, mark as complete, and delete tasks.

🚀 Features

✅ Add new tasks

✏️ Edit tasks

✅ Mark tasks as complete / undo

❌ Delete tasks

🎨 Modern, clean UI with CSS styling

🌍 Backend API with Express

📂 Project Structure
your-project/
│── backend/         # Node.js + Express server
│   └── server.js
│
│── frontend/        # React app
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── index.css
│   │   └── ...
│   └── package.json
│
│── .gitignore
│── README.md

⚙️ Backend Setup (Node + Express)

Navigate to backend folder:

cd backend


Install dependencies:

npm install express cors body-parser


Start the server:

node server.js


Server will run at 👉 http://localhost:5000

🎨 Frontend Setup (React)

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start the frontend:

npm start


React app will run at 👉 http://localhost:3000

🔗 API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all todos
POST	/api/todos	Add a new todo
PUT	/api/todos/:id	Update a todo (edit/done)
DELETE	/api/todos/:id	Delete a todo
📸 Screenshot (Sample UI)
![alt text](image-1.png)

🛠️ Technologies Used

Frontend: React, Axios, CSS

Backend: Node.js, Express.js, CORS, Body-Parser

🙌 Future Improvements

🔒 Add database (MongoDB) instead of in-memory storage

🌙 Dark mode toggle

📱 Responsive mobile-friendly design

🎞️ Smooth animations for tasks