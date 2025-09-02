// server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample data (in-memory for now)
let todos = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Build To-Do App" },
];

// GET all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// POST new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  const newTodo = {
    id: Date.now(), // unique ID
    task,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// DELETE a todo by id
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const initialLength = todos.length;
  todos = todos.filter((todo) => todo.id !== parseInt(id));

  if (todos.length === initialLength) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json({ message: "Todo deleted successfully" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
