# 📚 Student CRUD API

A simple **Node.js + Express** based REST API for managing students.  
This project demonstrates the basic **CRUD operations** (Create, Read, Update, Delete) using an in-memory array.

---

## 🚀 Features
- Create a new student
- Get all students
- Get a single student by ID
- Update student details
- Delete a student

---

## 🛠️ Technologies Used
- **Node.js**
- **Express.js**

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd student-crud-api
2. Install dependencies
bash
Copy code
npm install
3. Start the server
bash
Copy code
node server.js
Server will run at:

arduino
Copy code
http://localhost:3000
📌 API Endpoints
Create a Student
POST /students
Body (JSON):

json
Copy code
{
  "name": "Aarti",
  "marks": 92
}
Get All Students
GET /students

Get a Student by ID
GET /students/:id

Example:

bash
Copy code
GET /students/1
Update a Student
PUT /students/:id
Body (JSON):

json
Copy code
{
  "marks": 95
}
Delete a Student
DELETE /students/:id

🧪 Testing
You can test this API using:

Postman

Thunder Client (VS Code extension)

curl command line tool

