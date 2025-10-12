class Beverage {
    getDescription() {
        throw new Error("Method 'getDescription()' must be implemented");
    }

    getCost() {
        throw new Error("Method 'getCost()' must be implemented");
    }
}

class Espresso extends Beverage {
    getDescription() {
        return "Espresso";
    }
    getCost() {
        return 80;
    }
}

class LemonTea extends Beverage {
    getDescription() {
        return "LemonTea";
    }
    getCost() {
        return 40;
    }
}

class Sugar extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + Sugar";
    }
    getCost() {
        return this.beverage.getCost() + 10;
    }
}

class Honey extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + Honey";
    }
    getCost() {
        return this.beverage.getCost() + 20;
    }
}

class WhippedCream extends Beverage {
    constructor(beverage) {
        super();
        this.beverage = beverage;
    }
    getDescription() {
        return this.beverage.getDescription() + " + WhippedCream";
    }
    getCost() {
        return this.beverage.getCost() + 15;
    }
}

// Example Orders
const order1 = new Honey(new WhippedCream(new Espresso()));
const order2 = new Sugar(new Sugar(new LemonTea()));

console.log("Order 1:", order1.getDescription());
console.log("Cost 1: ₹", order1.getCost());

console.log("Order 2:", order2.getDescription());
console.log("Cost 2: ₹", order2.getCost());       
