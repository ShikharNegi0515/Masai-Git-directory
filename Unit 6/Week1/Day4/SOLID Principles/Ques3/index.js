class Bird {
    layEggs() {
        console.log("Laying eggs...");
    }
}

class FlyingBird extends Bird {
    fly() {
        console.log("Flying...");
    }
}

class Sparrow extends FlyingBird { }
class Ostrich extends Bird { }

const sparrow = new Sparrow();
sparrow.fly();

const ostrich = new Ostrich();
ostrich.layEggs(); 
