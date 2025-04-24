function createCar(make, model, year) {
    return {
        make : make,
        model : model,
        year : year,
        describeCar : function() {
            console.log(`This car is a ${year} ${make} ${model}.`)
        }
    }
}

const car = createCar("Toyota", "Camry", 2022);
car.describeCar();