class State {
    next(light) {
        console.log("Transition not defined for this state.");
    }

    showStatus() {
        console.log("Unknown state.");
    }
}

class RedState extends State {
    showStatus() {
        console.log("🔴 Red Light - Vehicles must STOP.");
    }

    next(light) {
        console.log("Changing from Red → Green...");
        light.setState(light.greenState);
    }
}

class GreenState extends State {
    showStatus() {
        console.log("🟢 Green Light - Vehicles can MOVE.");
    }

    next(light) {
        console.log("Changing from Green → Yellow...");
        light.setState(light.yellowState);
    }
}

class YellowState extends State {
    showStatus() {
        console.log("🟡 Yellow Light - Vehicles should SLOW DOWN.");
    }

    next(light) {
        console.log("Changing from Yellow → Red...");
        light.setState(light.redState);
    }
}

class TrafficLight {
    constructor() {
        this.redState = new RedState();
        this.greenState = new GreenState();
        this.yellowState = new YellowState();

        this.currentState = this.redState;
    }

    setState(state) {
        this.currentState = state;
    }

    showStatus() {
        this.currentState.showStatus();
    }

    next() {
        this.currentState.next(this);
    }
}


const light = new TrafficLight();

light.showStatus();
light.next();

light.showStatus();
light.next();

light.showStatus();
light.next();

light.showStatus();
