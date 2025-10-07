class Animal {
    makeSound(): void {
        console.log("Some sound");
    }
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Bark!");
    }
}

function makeAnimalSound(animal: Animal) {
    animal.makeSound();
}

const genericAnimal = new Animal();
const dog = new Dog();

makeAnimalSound(genericAnimal);
makeAnimalSound(dog);           
