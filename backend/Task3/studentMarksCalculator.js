// Student Marks Calculator

// Step 1: Create an array of student objects
let students = [
    { name: "Aaysha", marks: [85, 90, 78] },
    { name: "Neha", marks: [92, 88, 95] },
    { name: "Aqsa", marks: [70, 75, 80] }
];

// Step 2: Function to calculate total and average
function calculateResults(student) {
    let total = student.marks.reduce((sum, mark) => sum + mark, 0); // sum of marks
    let average = total / student.marks.length; // average
    return { total, average };
}

// Step 3: Display results
students.forEach(student => {
    let result = calculateResults(student);
    console.log(`Student: ${student.name}`);
    console.log(`Marks: ${student.marks.join(", ")}`);
    console.log(`Total: ${result.total}`);
    console.log(`Percentage: ${result.average.toFixed(2)}`);
    console.log("-------------------------");
});
