let age = 25;

function displayAge() {
    console.log("Current Age:", age);
}

function changeAge(newAge) {
    age = newAge; 
    console.log("Updated Age:", age);
}

displayAge();  
changeAge(30); 
displayAge();  
