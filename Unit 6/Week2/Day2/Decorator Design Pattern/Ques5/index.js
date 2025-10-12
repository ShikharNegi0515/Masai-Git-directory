class Beverage {
    getDescription() {
        throw new Error("Method 'getDescription()' must be implemented");
    }

    getCost() {
        throw new Error("Method 'getCost()' must be implemented");
    }
}

class Coffee extends Beverage {
    getDescription() {
        return "Coffee";
    }

    getCost() {
        return 50;
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

const myDrink = new WhippedCream(new Honey(new Sugar(new Coffee())));
console.log(myDrink.getDescription());
console.log(myDrink.getCost());        
