import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Fetch todos on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/todos").then((res) => {
      setTodos(res.data);
    });
  }, []);

  // Add todo
  const addTodo = () => {
    if (!newTask.trim()) return;
    axios
      .post("http://localhost:5000/api/todos", { task: newTask })
      .then((res) => {
        setTodos([...todos, res.data]);
        setNewTask("");
      });
  };

  // Delete todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // Start editing
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.task);
  };

  // Save edit
  const saveEdit = (id) => {
    axios
      .put(`http://localhost:5000/api/todos/${id}`, { task: editingText })
      .then((res) => {
        setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
        setEditingId(null);
        setEditingText("");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Do App</h1>

      <input
        type="text"
        placeholder="Enter a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>💾 Save</button>
                <button onClick={() => setEditingId(null)}>❌ Cancel</button>
              </>
            ) : (
              <>
                {todo.task}
                <button
                  onClick={() => startEdit(todo)}
                  style={{ marginLeft: "10px" }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  style={{ marginLeft: "10px" }}
                >
                  ❌ Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
