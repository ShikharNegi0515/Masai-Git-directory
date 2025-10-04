class Vehicle {
    brand: string;
    speed: number;

    constructor(brand: string, speed: number) {
        this.brand = brand;
        this.speed = speed;
    }

    drive(): void {
        console.log(`${this.brand} is driving at ${this.speed} km/h`);
    }
}

class Car extends Vehicle {
    fuelType: string;

    constructor(brand: string, speed: number, fuelType: string) {
        super(brand, speed);
        this.fuelType = fuelType;
    }

    refuel(): void {
        console.log(`Refueling ${this.fuelType}`);
    }
}

const myCar = new Car("Tesla", 120, "Electric");

myCar.drive();
myCar.refuel();  
