class IVehicle {
  start() {
    throw new Error("Method 'start()' must be implemented");
  }
}

class Car extends IVehicle {
  start() {
    console.log("Car is starting");
  }
}

class Bike extends IVehicle {
  start() {
    console.log("Bike is starting");
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
}

const car = new Car();
const bike = new Bike();

const driver1 = new Driver(car);
driver1.drive();

const driver2 = new Driver(bike);
driver2.drive();
