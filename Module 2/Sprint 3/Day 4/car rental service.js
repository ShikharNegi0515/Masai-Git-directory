// Step 1
function Car(make, model, year, type, isAvailabe = true) {
    this.make = make
    this.model = model
    this.type = type;
    this.year = year
    this.isAvailabe = isAvailabe
}

// Step 2
function Customer(name, renedCars = []) {
    this.name = name
    this.rendedCars = renedCars
}

// Step 3
Customer.prototype.rentCar = function (car) {
    if (car.isAvailabe) {
        car.isAvailabe = false
        this.rendedCars.push(car)
        console.log(`${this.name} rented a ${car.make} ${car.model}`);
    } else {
        console.log(`${car.make} ${car.model} is already rented.`);
    }
}

// Step 6

Customer.prototype.returnCar = function (car) {
    let index = this.rendedCars.indexOf(car)
    if (index > -1) {
        this.rendedCars.splice(index, 1)
        console.log(`${this.name} is returning ${car.make} ${car.model}...`)
    }
    setTimeout(() => {
        car.isAvailable = true;
        console.log(`${car.make} ${car.model} has been returned and is now available.`);
    }, 2000);
}

// Step 4
function PremiumCustomer(name, renedCars = [], discountedRate) {
    Customer.call(this, name)
    this.discountedRate = discountedRate
}
// Inherit prototype methods
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

// Step 5
function calculateRentalPrice(days, car, isPremium, discountRate) {
    const baseRate = 50
    let typeMultiplier = 1

    if (car.type == 'SUV') typeMultiplier = 1.5;
    else if (car.type == 'Sedan') typeMultiplier = 1.2

    let price = baseRate * typeMultiplier * days;

    if (isPremium) {
        price = price * (1 - discountRate)
    }
    return price
}

// Step 7

function scheduleMaintenance(car, delay) {
    console.log(`Maintenance started for ${car.make} ${car.model}...`);

    setTimeout(function () {
        car.isAvailable = true;
        console.log(`Maintenance completed. ${car.make} ${car.model} is now available.`);
    }, delay);
}


// Step 8 - Demonstration
// Create Cars
const car1 = new Car("Toyota", "Corolla", 2020, "Sedan");
const car2 = new Car("Honda", "CR-V", 2022, "SUV");
const car3 = new Car("Ford", "Fusion", 2021, "Sedan");

// Create Customers
const alice = new Customer("Alice");
const bob = new PremiumCustomer("Bob", 0.2); // 20% discount

// Regular rent
alice.rentCar(car1);
console.log("Rental price (Alice): $" + calculateRentalPrice(3, car1, false));

// Premium rent with bind
const boundRent = alice.rentCar.bind(bob); // Using bind
boundRent(car2);
console.log("Rental price (Bob): $" + calculateRentalPrice(5, car2, true, bob.discountRate));

// Return cars
setTimeout(() => {
    bob.returnCar(car2);
}, 4000);

setTimeout(() => {
    scheduleMaintenance(car2, 3000);
}, 7000);
