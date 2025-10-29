const students = [
  { name: "Alice", marks: 85 },
  { name: "Bob", marks: 92 },
  { name: "Charlie", marks: 70 },
];

const avg = students
  .filter(student => student.marks > 80)               
  .reduce((acc, cur, _, arr) => acc + cur.marks / arr.length, 0); 

console.log(avg);
