// server.js
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

// middleware to parse JSON
app.use(express.json());

// ---- In-memory user store ----
let users = [];
let nextId = 1;

// ---- In-memory todos ----
let todos = [];
let nextTodoId = 1;

// ---- Validation Schemas ----
const registerSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[0-9]/, "Include at least one number"),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// ---- Helpers ----
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

function auth(required = true) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : null;

    if (!token) {
      if (required) return res.status(401).json({ message: "Missing token" });
      req.user = null;
      return next();
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded; // { userId }
      return next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}

function publicUser(u) {
  return { id: u.id, name: u.name, email: u.email, createdAt: u.createdAt };
}

// ---- Auth Routes ----
app.post("/api/auth/register", async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const email = parsed.email.toLowerCase();

    const existing = users.find((u) => u.email === email);
    if (existing)
      return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await bcrypt.hash(parsed.password, 10);
    const user = {
      id: nextId++,
      name: parsed.name,
      email,
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    users.push(user);

    const token = signToken({ userId: user.id });
    res.status(201).json({ token, user: publicUser(user) });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const normalizedEmail = email.toLowerCase();

    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ userId: user.id });
    res.json({ token, user: publicUser(user) });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/me", auth(true), (req, res) => {
  const user = users.find((u) => u.id === req.user.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: publicUser(user) });
});

app.get("/api/_debug/users", (req, res) => {
  res.json({ users: users.map(publicUser) });
});

// ---- Todo Routes ----
app.get("/api/todos", auth(true), (req, res) => {
  const userTodos = todos.filter((t) => t.userId === req.user.userId);
  res.json({ todos: userTodos });
});

app.post("/api/todos", auth(true), (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }
  const todo = {
    id: nextTodoId++,
    title,
    completed: false,
    userId: req.user.userId,
    createdAt: new Date().toISOString(),
  };
  todos.push(todo);
  res.status(201).json({ todo });
});

app.patch("/api/todos/:id", auth(true), (req, res) => {
  const todo = todos.find(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.userId
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.completed = !todo.completed;
  res.json({ todo });
});

app.delete("/api/todos/:id", auth(true), (req, res) => {
  const idx = todos.findIndex(
    (t) => t.id === parseInt(req.params.id) && t.userId === req.user.userId
  );
  if (idx === -1) return res.status(404).json({ message: "Todo not found" });

  const deleted = todos.splice(idx, 1)[0];
  res.json({ deleted });
});

// ---- Start ----
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
