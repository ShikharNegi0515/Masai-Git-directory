// Step 1
function Animal() {
    this.type = "Animal";
  }
  
// Step 2
Animal.prototype.sound = function () {
  console.log("Animal sound");
};

let animal = new Animal
animal.sound()

// Step 3
function Dog() {
    Animal.call(this); 
  }

//   Step 4
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; 

// Another Way
// function Dog() {}
// Object.setPrototypeOf(Dog.prototype, Animal.prototype);

//  Stpe 5
Dog.prototype.sound = function () {
    console.log("Bark");
  };

//  Step 6
const myDog = new Dog();
myDog.sound(); 
