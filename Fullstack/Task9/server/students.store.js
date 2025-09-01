import fs from "fs-extra";
import { nanoid } from "nanoid";

const DB_PATH = "./students.json";

async function ensureDB() {
    const exists = await fs.pathExists(DB_PATH);
    if (!exists) {
        await fs.writeJSON(DB_PATH, { students: sample() }, { spaces: 2 });
    }
    const db = await fs.readJSON(DB_PATH);
    if (!db.students) db.students = [];
    return db;
}

function sample() {
    return [
        { id: nanoid(8), name: "Aaysha Mansuri", email: "aaysha@example.com", course: "CS", year: 3, gpa: 8.7 },
        { id: nanoid(8), name: "Neha Sharma", email: "neha@example.com", course: "IT", year: 2, gpa: 8.2 },
        { id: nanoid(8), name: "Rahul Verma", email: "rahul@example.com", course: "ECE", year: 4, gpa: 7.9 }
    ];
}

export async function list({ q, course, sort = "name", dir = "asc" }) {
    const { students } = await ensureDB();
    let arr = students;
    if (q) {
        const needle = q.toLowerCase();
        arr = arr.filter(
            (s) =>
                s.name.toLowerCase().includes(needle) ||
                s.email.toLowerCase().includes(needle)
        );
    }
    if (course) arr = arr.filter((s) => s.course.toLowerCase() === course.toLowerCase());
    return sortByField(arr, sort, dir);
}

function sortByField(arr, field, dir) {
    const sign = dir === "desc" ? -1 : 1;
    return [...arr].sort((a, b) =>
        a[field] > b[field] ? 1 * sign : a[field] < b[field] ? -1 * sign : 0
    );
}

export async function get(id) {
    const { students } = await ensureDB();
    return students.find((s) => s.id === id) || null;
}

export async function create(payload) {
    const db = await ensureDB();
    const student = { id: nanoid(8), ...payload };
    db.students.push(student);
    await fs.writeJSON(DB_PATH, db, { spaces: 2 });
    return student;
}

export async function update(id, payload) {
    const db = await ensureDB();
    const idx = db.students.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    db.students[idx] = { ...db.students[idx], ...payload };
    await fs.writeJSON(DB_PATH, db, { spaces: 2 });
    return db.students[idx];
}

export async function remove(id) {
    const db = await ensureDB();
    const before = db.students.length;
    db.students = db.students.filter((s) => s.id !== id);
    await fs.writeJSON(DB_PATH, db, { spaces: 2 });
    return db.students.length !== before;
}
