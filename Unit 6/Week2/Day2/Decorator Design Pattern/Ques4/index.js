class Beverage {
    getDescription() {
        throw new Error("Method 'getDescription()' must be implemented");
    }

    getCost() {
        throw new Error("Method 'getCost()' must be implemented");
    }
}

class GreenTea extends Beverage {
    getDescription() {
        return "Green Tea";
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

const tea = new Honey(new Sugar(new GreenTea()));
console.log(tea.getDescription());
console.log(tea.getCost());       
