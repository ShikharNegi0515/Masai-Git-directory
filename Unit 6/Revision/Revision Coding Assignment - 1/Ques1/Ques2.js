const people = [
    { name: "A", age: 21 },
    { name: "B", age: 42 },
    { name: "C", age: 29 },
    { name: "D", age: 36 },
];

function totalOfTop3Oldest(people) {
    const sorted = people.sort((a, b) => b.age - a.age); 
    const top3 = sorted.slice(0, 3);                     
    const total = top3.reduce((sum, person) => sum + person.age, 0); 
    return total;
}

console.log(totalOfTop3Oldest(people));
