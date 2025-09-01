// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample student data
let students = [
  { id: 1, name: "Aaysha", marks: 85 },
  { id: 2, name: "Neha", marks: 90 },
  { id: 3, name: "Ajay", marks: 78 },
];

// ✅ CREATE (POST)
app.post("/students", (req, res) => {
  const { name, marks } = req.body;
  const newStudent = {
    id: students.length + 1,
    name,
    marks,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// ✅ READ ALL (GET)
app.get("/students", (req, res) => {
  res.json(students);
});

// ✅ READ ONE (GET by ID)
app.get("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// ✅ UPDATE (PUT)
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, marks } = req.body;
  student.name = name || student.name;
  student.marks = marks || student.marks;

  res.json(student);
});

// ✅ DELETE
app.delete("/students/:id", (req, res) => {
  const studentIndex = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (studentIndex === -1) return res.status(404).json({ error: "Student not found" });

  const deletedStudent = students.splice(studentIndex, 1);
  res.json(deletedStudent[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
