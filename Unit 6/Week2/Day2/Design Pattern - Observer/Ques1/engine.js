class Engine {
  start() {
    console.log("Engine started");
  }
}

class Car {
  constructor() {
    this.engine = new Engine();
  }

  drive() {
    this.engine.start();
    console.log("Car is driving");
  }
}

const car = new Car();
car.drive();
