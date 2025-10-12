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

const tea = new GreenTea();
console.log(tea.getDescription());
console.log(tea.getCost());        
