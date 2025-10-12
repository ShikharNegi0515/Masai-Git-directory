class IEngine {
    start() {
        throw new Error("Method 'start()' must be implemented");
    }
}

class PetrolEngine extends IEngine {
    start() {
        console.log("Petrol engine started");
    }
}

class DieselEngine extends IEngine {
    start() {
        console.log("Diesel engine started");
    }
}

class Car {
    constructor(engine) {
        this.engine = engine;
    }

    drive() {
        this.engine.start();
        console.log("Driving car");
    }
}

const petrolCar = new Car(new PetrolEngine());
petrolCar.drive();

const dieselCar = new Car(new DieselEngine());
dieselCar.drive();
