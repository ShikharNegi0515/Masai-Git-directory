let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
  };

for(let i in studentScores) {
    if(studentScores[i]>=90) {
        console.log(`${i} - A`)
    }
    else if(studentScores[i]>=80) {
        console.log(`${i} - B`)
    }
    else if(studentScores[i]>=70) {
        console.log(`${i} - C`)
    }
    else if(studentScores[i]>=60) {
        console.log(`${i} - D`)
    }
    else {
        console.log(`${i} - F`)
    }
}