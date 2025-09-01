import { useEffect, useState } from "react";

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    course: "",
    year: "",
    gpa: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch students on page load
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update Student
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      course: form.course,
      year: Number(form.year),
      gpa: Number(form.gpa)
    };

    try {
      if (editingId) {
        // Update
        const res = await fetch(
          `http://localhost:4000/api/students/${editingId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          }
        );

        if (!res.ok) throw new Error("Failed to update");
      } else {
        // Create
        const res = await fetch("http://localhost:4000/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (!res.ok) throw new Error("Failed to add");
      }

      await fetchStudents();
      setForm({ name: "", email: "", course: "", year: "", gpa: "" });
      setEditingId(null);
    } catch (err) {
      console.error("Error submitting student:", err);
    }
  };

  // Edit button clicked → fill form
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      course: student.course,
      year: student.year,
      gpa: student.gpa
    });
    setEditingId(student.id);
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/students/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) throw new Error("Failed to delete");
      await fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="course"
          value={form.course}
          onChange={handleChange}
          placeholder="Course"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          name="year"
          value={form.year}
          onChange={handleChange}
          placeholder="Year"
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          step="0.1"
          name="gpa"
          value={form.gpa}
          onChange={handleChange}
          placeholder="GPA"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm({ name: "", email: "", course: "", year: "", gpa: "" });
              setEditingId(null);
            }}
            className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Student List */}
      <ul className="space-y-2">
        {students.map((s) => (
          <li
            key={s.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-gray-600">
                {s.email} | {s.course} | Year {s.year} | GPA: {s.gpa}
              </p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
