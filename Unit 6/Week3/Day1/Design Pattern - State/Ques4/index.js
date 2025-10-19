class State {
    insertCard(atm) {
        console.log("Action not allowed in current state.");
    }

    enterPin(atm) {
        console.log("Action not allowed in current state.");
    }

    withdrawCash(atm) {
        console.log("Action not allowed in current state.");
    }

    completeTransaction(atm) {
        console.log("Action not allowed in current state.");
    }
}


class IdleState extends State {
    insertCard(atm) {
        console.log("💳 Card inserted. Please enter your PIN.");
        atm.setState(atm.cardInsertedState);
    }
}

class CardInsertedState extends State {
    enterPin(atm) {
        console.log("✅ PIN verified. You are authenticated.");
        atm.setState(atm.authenticatedState);
    }

    insertCard(atm) {
        console.log("Card already inserted. Please enter PIN.");
    }
}

class AuthenticatedState extends State {
    withdrawCash(atm) {
        console.log("💰 Dispensing cash...");
        atm.setState(atm.dispensingCashState);
    }
}

class DispensingCashState extends State {
    completeTransaction(atm) {
        console.log("✅ Transaction complete. Returning to Idle state.");
        atm.setState(atm.idleState);
    }

    withdrawCash(atm) {
        console.log("Please wait — already dispensing cash.");
    }
}


class ATM {
    constructor() {
        this.idleState = new IdleState();
        this.cardInsertedState = new CardInsertedState();
        this.authenticatedState = new AuthenticatedState();
        this.dispensingCashState = new DispensingCashState();

        this.currentState = this.idleState;
    }

    setState(state) {
        this.currentState = state;
    }

    insertCard() {
        this.currentState.insertCard(this);
    }

    enterPin() {
        this.currentState.enterPin(this);
    }

    withdrawCash() {
        this.currentState.withdrawCash(this);
    }

    completeTransaction() {
        this.currentState.completeTransaction(this);
    }
}

const atm = new ATM();

atm.insertCard();
atm.enterPin();
atm.withdrawCash();
atm.completeTransaction();
