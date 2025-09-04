📝 Notes App

A simple full-stack Notes Application built with Node.js, Express, MongoDB, and Vanilla JavaScript.
This app allows users to create, read, update, delete, and pin/unpin notes with a clean UI.

🚀 Features

Add new notes with title and body

Edit existing notes

Pin / Unpin notes (pinned notes appear at the top)

Delete notes

All notes are stored in MongoDB

Simple frontend with HTML, CSS, JS

📂 Project Structure
NOTES-APP/
  ├── node_modules/         # Installed dependencies
  ├── public/               # Frontend files
  │   ├── index.html        # Main UI
  │   ├── styles.css        # Styling
  │   └── app.js            # Frontend logic
  ├── .env                  # Environment variables (Mongo URI, PORT)
  ├── package.json          # Project metadata + dependencies
  ├── server.js             # Express server + API routes
  └── README.md             # Project documentation

🛠️ Tech Stack

Backend: Node.js, Express

Database: MongoDB (Mongoose ODM)

Frontend: HTML, CSS, JavaScript

Dev Tools: Nodemon, MongoDB Compass

⚙️ Installation & Setup

Clone the repo / create folder

git clone <your-repo-url>
cd notes-app


Install dependencies

npm install


Setup environment variables
Create a .env file in the root:

MONGO_URI=mongodb://127.0.0.1:27017/notes_app
PORT=3000


If using MongoDB Atlas, replace MONGO_URI with your connection string.

Run the app

npm run dev


Server will start at: http://localhost:3000

📡 API Endpoints
Method	Endpoint	Description
GET	/api/notes	Get all notes
GET	/api/notes/:id	Get single note
POST	/api/notes	Create new note
PUT	/api/notes/:id	Update existing note
DELETE	/api/notes/:id	Delete note
📸 Screenshots

(Add screenshots of your UI here once you take them, e.g. home page, add note form, MongoDB Compass view)

🙌 Acknowledgements

Express.js

MongoDB

Mongoose