export default function StudentList({ students }) {
    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Student List</h2>
            <ul>
                {students.map((student, index) => (
                    <li key={index} className="border p-2 mb-2 rounded">
                        <strong>{student.name}</strong> - {student.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}
