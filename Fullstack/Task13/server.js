// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Parse JSON bodies
app.use(express.json());

// Serve frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// --- DB connection ---
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/notes_app';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

// --- Note model ---
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, default: '' },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

// --- CRUD routes ---
// Get all notes
app.get('/api/notes', async (req, res) => {
  const notes = await Note.find().sort({ pinned: -1, updatedAt: -1 });
  res.json(notes);
});

// Get one note
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch {
    res.status(400).json({ error: 'Invalid note id' });
  }
});

// Create note
app.post('/api/notes', async (req, res) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      body: req.body.body || '',
      pinned: !!req.body.pinned,
    });
    res.status(201).json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Update note
app.put('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Delete note
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const deleted = await Note.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Note not found' });
    res.json({ ok: true });
  } catch {
    res.status(400).json({ error: 'Invalid note id' });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
