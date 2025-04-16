function personInfo() {
    console.log(`Name : ${this.name}, Age: ${this.age}`)
}

const person = {
    name: "Shikhar",
    age: 23
};

personInfo.call(person)