import express from "express";
import cors from "cors";
import { list, get, create, update, remove } from "./students.store.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (_, res) => res.json({ ok: true }));

// Simple validation function
function validateStudent(data) {
    const errors = [];
    if (!data.name || typeof data.name !== "string") errors.push("Name is required");
    if (!data.email || typeof data.email !== "string") errors.push("Email is required");
    if (!data.course || typeof data.course !== "string") errors.push("Course is required");
    if (!data.year || typeof data.year !== "number") errors.push("Year must be a number");
    if (!data.gpa || typeof data.gpa !== "number") errors.push("GPA must be a number");
    return errors;
}

// List students
app.get("/api/students", async (req, res) => {
    const { q, course, sort = "name", dir = "asc" } = req.query;
    const all = await list({ q, course, sort, dir });
    res.json(all);
});

// Get student by ID
app.get("/api/students/:id", async (req, res) => {
    const student = await get(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });
    res.json(student);
});

// Create student
app.post("/api/students", async (req, res) => {
    const errors = validateStudent(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });
    const created = await create(req.body);
    res.status(201).json(created);
});

// Update student
app.put("/api/students/:id", async (req, res) => {
    const errors = validateStudent(req.body);
    if (errors.length > 0) return res.status(400).json({ errors });
    const updated = await update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
    const ok = await remove(req.params.id);
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.status(204).end();
});

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
