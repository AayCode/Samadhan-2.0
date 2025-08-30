let marks = [78, 85, 92, 67, 89, 96, 70, 78];

// Assume first number is highest
let highest = marks[0];

// Check every mark
for (let i = 1; i < marks.length; i++) {
  if (marks[i] > highest) {
    highest = marks[i]; // update highest
  }
}

console.log("Highest Marks:", highest);

