// Student Object
const student = {
  id: 1,
  name: "Aaysha",
  marks: 85,
  age: 20,
  course: "Computer Science"
};

// Function to print student details
function printStudentDetails(student) {
  console.log("Student Details:");
  console.log(`ID: ${student.id}`);
  console.log(`Name: ${student.name}`);
  console.log(`Marks: ${student.marks}`);
  console.log(`Age: ${student.age}`);
  console.log(`Course: ${student.course}`);
}

// Call the function to print details
printStudentDetails(student);
