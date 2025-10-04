// "Interface" definition (conceptually)
class IDuck {
    swim() { }
    fly() { }
    sound() { }
}

class ToyDuck extends IDuck {
    fly() {
        console.log("Cannot fly");
    }
    sound() {
        console.log("Cannot sound");
    }
    swim() {
        console.log("Can float on water");
    }
}

const toyDuck = new ToyDuck();
toyDuck.fly();
toyDuck.sound();
toyDuck.swim();
