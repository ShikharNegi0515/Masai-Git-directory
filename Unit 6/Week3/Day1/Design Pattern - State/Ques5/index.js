class State {
    turnOn(light) {
        console.log("Action not allowed in current state.");
    }

    turnOff(light) {
        console.log("Action not allowed in current state.");
    }

    detectMotion(light) {
        console.log("Action not allowed in current state.");
    }

    adjustBrightness(light, isDaytime) {
        console.log("Action not allowed in current state.");
    }
}


class OffState extends State {
    turnOn(light) {
        console.log("💡 Light turned ON manually.");
        light.setState(light.onState);
    }

    detectMotion(light) {
        console.log("🚶 Motion detected. Turning on automatically...");
        light.setState(light.motionDetectionState);
    }
}

class OnState extends State {
    turnOff(light) {
        console.log("💡 Light turned OFF manually.");
        light.setState(light.offState);
    }

    adjustBrightness(light, isDaytime) {
        console.log("🔆 Adjusting brightness based on time...");
        light.setState(light.brightnessAdjustmentState);
        light.adjustBrightness(isDaytime);
    }
}

class MotionDetectionState extends State {
    adjustBrightness(light, isDaytime) {
        console.log("🔆 Adjusting brightness after motion detection...");
        light.setState(light.brightnessAdjustmentState);
        light.adjustBrightness(isDaytime);
    }

    turnOff(light) {
        console.log("No motion detected. Turning light OFF.");
        light.setState(light.offState);
    }
}

class BrightnessAdjustmentState extends State {
    adjustBrightness(light, isDaytime) {
        if (isDaytime) {
            console.log("☀️ Daytime detected — reducing brightness.");
        } else {
            console.log("🌙 Nighttime detected — increasing brightness.");
        }

        light.setState(light.onState);
    }
}

class SmartLight {
    constructor() {
        this.offState = new OffState();
        this.onState = new OnState();
        this.motionDetectionState = new MotionDetectionState();
        this.brightnessAdjustmentState = new BrightnessAdjustmentState();

        this.currentState = this.offState;
    }

    setState(state) {
        this.currentState = state;
    }

    turnOn() {
        this.currentState.turnOn(this);
    }

    turnOff() {
        this.currentState.turnOff(this);
    }

    detectMotion() {
        this.currentState.detectMotion(this);
    }

    adjustBrightness(isDaytime) {
        this.currentState.adjustBrightness(this, isDaytime);
    }
}


const light = new SmartLight();

light.turnOn();
light.adjustBrightness(true);
light.detectMotion();
light.turnOff();

console.log("\n--- Motion Mode ---");
light.detectMotion();
light.adjustBrightness(false);
light.turnOff();           
