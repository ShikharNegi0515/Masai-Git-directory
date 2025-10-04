class Bird {
    fly() {
        console.log("I can fly");
    }
}

class Penguin extends Bird {
    fly() {
        console.log("I cannot fly");
    }
}

const bird = new Bird();
const penguin = new Penguin();

bird.fly();
penguin.fly();
