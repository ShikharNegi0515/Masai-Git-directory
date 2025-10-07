class ShippingStrategy {
    calculate() {
        throw new Error("calculate() must be implemented");
    }
}

class StandardShipping extends ShippingStrategy {
    calculate() {
        return 50;
    }
}

class ExpressShipping extends ShippingStrategy {
    calculate() {
        return 100;
    }
}

class OvernightShipping extends ShippingStrategy {
    calculate() {
        return 150;
    }
}

class Shipping {
    constructor(strategy) {
        this.strategy = strategy;
    }

    calculate() {
        return this.strategy.calculate();
    }
}

const standard = new Shipping(new StandardShipping());
console.log("Standard:", standard.calculate()); 

const express = new Shipping(new ExpressShipping());
console.log("Express:", express.calculate()); 

const overnight = new Shipping(new OvernightShipping());
console.log("Overnight:", overnight.calculate());
