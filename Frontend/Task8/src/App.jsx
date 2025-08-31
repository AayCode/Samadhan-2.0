import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn .map", done: false },
    { id: 2, title: "Practice onClick/onChange", done: true },
  ]);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleAdd() {
    const value = text.trim();
    if (!value) return;
    const newTodo = { id: Date.now(), title: value, done: false };
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleAdd();
  }

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">📋 My To-Do App</header>

      {/* Main content */}
      <main className="main">
        <div className="input-row">
          <input
            type="text"
            placeholder="Add a new task…"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAdd}>Add</button>
        </div>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => handleToggle(todo.id)}
              />
              <span className={todo.done ? "done" : ""}>{todo.title}</span>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </main>

      {/* Footer */}
      <footer className="footer">
        {remaining} item{remaining !== 1 ? "s" : ""} left
      </footer>
    </div>
  );
}