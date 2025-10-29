const employees = [
  { name: "Amit", dept: "Tech", salary: 70000, rating: 4.8 },
  { name: "Neha", dept: "Tech", salary: 60000, rating: 4.2 },
  { name: "Ravi", dept: "HR", salary: 55000, rating: 4.7 },
  { name: "Sonia", dept: "Tech", salary: 75000, rating: 4.9 },
  { name: "Karan", dept: "Finance", salary: 50000, rating: 3.9 },
];

const techEmployees = employees.filter(emp => emp.dept === "Tech");
const topRated = techEmployees.filter(emp => emp.rating > 4.5);
const sorted = topRated.sort((a, b) => b.salary - a.salary);
const names = sorted.map(emp => emp.name);
const totalSalary = sorted.reduce((sum, emp) => sum + emp.salary, 0);

console.log(names);
console.log("Total Salary:", totalSalary);