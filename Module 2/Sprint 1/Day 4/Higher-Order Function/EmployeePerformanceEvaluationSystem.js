let arr = [{ name: "Alice", tasksCompleted: 8, rating: 4.7 },
           { name: "Bob", tasksCompleted: 4, rating: 4.0 },
           { name: "Charlie", tasksCompleted: 6, rating: 3.5 },
           { name: "David", tasksCompleted: 10, rating: 4.9 },
           { name: "Eve", tasksCompleted: 7, rating: 2.8 }
            ]

let narr = arr.filter(elem => elem.tasksCompleted>5)
              .map(elem => ({ 
                name: elem.name,
                performance : elem.rating > 4.5 
                ? "Excellent" 
                : elem.rating >= 3 
                ? "Good" 
                : "Needs Improvement"
            }))
              .sort((a, b) => {
                const order = { "Excellent": 3, "Good": 2, "Needs Improvement": 1 };
                return order[b.performance] - order[a.performance];
              });  

console.log(narr)