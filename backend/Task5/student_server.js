// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Sample student data
let students = [
  { id: 1, name: "Aaysha", marks: 85 },
  { id: 2, name: "Neha", marks: 90 },
  { id: 3, name: "Aqsa", marks: 78 }
];

// Root route (fix for Cannot GET /)
app.get("/", (req, res) => {
  res.send("Welcome to the Student API! Go to /students to see the list.");
});

// Students route
app.get("/students", (req, res) => {
  res.json(students);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
