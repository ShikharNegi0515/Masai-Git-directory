// Strategy Interface (conceptual)
class FlyStrategy {
    fly() {
        throw new Error("fly() must be implemented by subclass");
    }
}

// Concrete Strategy 1
class FastFly extends FlyStrategy {
    fly() {
        console.log("Flying fast like a rocket!");
    }
}

// Concrete Strategy 2
class NoFly extends FlyStrategy {
    fly() {
        console.log("I cannot fly");
    }
}

// Context Class
class Duck {
    constructor(flyStrategy) {
        this.flyStrategy = flyStrategy; // Composition — not inheritance
    }

    performFly() {
        this.flyStrategy.fly(); // Delegate behavior
    }

    setFlyStrategy(newStrategy) {
        this.flyStrategy = newStrategy; // Change behavior at runtime
    }
}

const duck = new Duck(new FastFly());
duck.performFly(); 

duck.setFlyStrategy(new NoFly());
duck.performFly(); 
