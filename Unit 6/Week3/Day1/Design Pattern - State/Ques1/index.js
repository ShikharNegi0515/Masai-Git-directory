class State {
  insertCoin(machine) {
    console.log("Action not allowed in current state.");
  }

  makeSelection(machine) {
    console.log("Action not allowed in current state.");
  }

  dispense(machine) {
    console.log("Action not allowed in current state.");
  }
}

class IdleState extends State {
  insertCoin(machine) {
    console.log("Coin inserted. Moving to Processing state...");
    machine.setState(machine.processingState);
  }
}

class ProcessingState extends State {
  makeSelection(machine) {
    console.log("Selection made. Moving to Dispensing state...");
    machine.setState(machine.dispensingState);
  }
}

class DispensingState extends State {
  dispense(machine) {
    console.log("Dispensing item... Returning to Idle state.");
    machine.setState(machine.idleState);
  }
}

class VendingMachine {
  constructor() {
    this.idleState = new IdleState();
    this.processingState = new ProcessingState();
    this.dispensingState = new DispensingState();

    this.currentState = this.idleState; 
  }

  setState(state) {
    this.currentState = state;
  }

  insertCoin() {
    this.currentState.insertCoin(this);
  }

  makeSelection() {
    this.currentState.makeSelection(this);
  }

  dispense() {
    this.currentState.dispense(this);
  }
}



const machine = new VendingMachine();

machine.insertCoin();   
machine.makeSelection(); 
machine.dispense();    
