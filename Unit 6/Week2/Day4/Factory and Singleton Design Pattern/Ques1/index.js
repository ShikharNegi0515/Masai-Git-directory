class Vehicle {
    getDetails() {
        throw new Error("Method 'getDetails()' must be implemented.");
    }
}

class Bike extends Vehicle {
    constructor(brand) {
        super();
        this.brand = brand;
    }

    getDetails() {
        return `Bike: ${this.brand}`;
    }
}

class Car extends Vehicle {
    constructor(brand) {
        super();
        this.brand = brand;
    }

    getDetails() {
        return `Car: ${this.brand}`;
    }
}

class VehicleFactory {
    static createVehicle(type, brand) {
        switch (type) {
            case "Bike":
                return new Bike(brand);
            case "Car":
                return new Car(brand);
            default:
                throw new Error("Unknown vehicle type");
        }
    }
}

const myBike = VehicleFactory.createVehicle("Bike", "Yamaha");
console.log(myBike.getDetails());

const myCar = VehicleFactory.createVehicle("Car", "Toyota");
console.log(myCar.getDetails()); 
