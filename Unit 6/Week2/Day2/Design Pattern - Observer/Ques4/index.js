class Vehicle {
    start() {
        throw new Error("Method 'start()' must be implemented");
    }
}

class Bike extends Vehicle {
    start() {
        console.log("Bike is starting");
    }
}

class Car extends Vehicle {
    start() {
        console.log("Car is starting");
    }
}

class Driver {
    constructor(vehicle) {
        this.vehicle = vehicle;
    }

    drive() {
        this.vehicle.start();
        console.log("Driving...");
    }

    setVehicle(vehicle) {
        this.vehicle = vehicle;
    }
}

const driver = new Driver(new Bike());
driver.drive();

driver.setVehicle(new Car());
driver.drive(); 
