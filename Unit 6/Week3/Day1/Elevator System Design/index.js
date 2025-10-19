class State {
    enter(elevator) { }
    exit(elevator) { }
    tick(elevator) { }
    toString() { return "State"; }
}


class MovingState extends State {
    constructor(targetFloor) {
        super();
        this.targetFloor = targetFloor;
    }
    enter(elevator) {
        elevator.log(`➡️ Starting to move toward floor ${this.targetFloor}`);
    }
    tick(elevator) {
        if (elevator.currentFloor === this.targetFloor) {
            elevator.log(`Arrived at floor ${this.targetFloor}`);
            elevator.setState(new OpenDoorState());
            return;
        }

        if (this.targetFloor > elevator.currentFloor) {
            elevator.currentFloor += 1;
            elevator.direction = "up";
        } else if (this.targetFloor < elevator.currentFloor) {
            elevator.currentFloor -= 1;
            elevator.direction = "down";
        }

        elevator.log(`Moved to floor ${elevator.currentFloor} (${elevator.direction})`);

        if (elevator.currentFloor === this.targetFloor) {
            elevator.setState(new OpenDoorState());
        }
    }
    toString() { return `Moving(to ${this.targetFloor})`; }
}

class OpenDoorState extends State {
    constructor(openTicks = 2) {
        super();
        this.remainingTicks = openTicks;
    }
    enter(elevator) {
        elevator.direction = "idle";
        elevator.log("🚪 Doors opening...");
        elevator.reportStatus();
        elevator.handleArrival();
    }
    tick(elevator) {
        if (this.remainingTicks > 0) {
            elevator.log(`🚪 Doors open (${this.remainingTicks} ticks remaining)`);
            this.remainingTicks--;
            return;
        }
        elevator.setState(new CloseDoorState());
    }
    toString() { return `OpenDoor(${this.remainingTicks})`; }
}

class CloseDoorState extends State {
    enter(elevator) {
        elevator.log("🚪 Doors closing...");
        elevator.reportStatus();
        elevator.processPendingAssignments();
    }
    tick(elevator) {
        if (elevator.hasAssignedTarget()) {
            const target = elevator.getAssignedTarget();
            elevator.setState(new MovingState(target));
        } else {
            elevator.direction = "idle";
            elevator.log("⏸️ Idle at floor " + elevator.currentFloor);
        }
    }
    toString() { return "CloseDoor"; }
}


class Elevator {
    constructor(id, totalFloors, system) {
        this.id = id;
        this.totalFloors = totalFloors;
        this.system = system;

        this.currentFloor = 1;
        this.direction = "idle";
        this.passengers = [];
        this.maxPeople = 8;
        this.maxWeight = 680;

        this.state = new CloseDoorState();
        this.assignedTargets = [];
        this.state.enter(this);
    }

    log(msg) {
        console.log(`[Elevator ${this.id}] ${msg}`);
    }

    reportStatus() {
        const people = this.passengers.length;
        const weight = this.passengers.reduce((s, p) => s + p.weight, 0);
        console.log(`--> [Status] E${this.id} floor=${this.currentFloor} dir=${this.direction} state=${this.state.toString()} occupancy=${people}/${this.maxPeople} weight=${weight}kg targets=[${this.assignedTargets.join(",")}]`);
    }

    setState(newState) {
        if (this.state && this.state.exit) this.state.exit(this);
        this.state = newState;
        if (this.state && this.state.enter) this.state.enter(this);
    }

    tick() {
        if (this.state && this.state.tick) this.state.tick(this);
    }

    assignTarget(floor) {
        if (!this.assignedTargets.includes(floor)) {
            this.assignedTargets.push(floor);
            this.log(`Assigned target floor ${floor}. Targets now: [${this.assignedTargets.join(",")}]`);
        }
    }

    hasAssignedTarget() {
        return this.assignedTargets.length > 0;
    }

    getAssignedTarget() {
        if (!this.hasAssignedTarget()) return null;
        if (this.direction === "up") {
            const higher = this.assignedTargets.filter(f => f >= this.currentFloor);
            if (higher.length) return Math.min(...higher);
        } else if (this.direction === "down") {
            const lower = this.assignedTargets.filter(f => f <= this.currentFloor);
            if (lower.length) return Math.max(...lower);
        }
        let nearest = this.assignedTargets[0];
        let bestDist = Math.abs(this.currentFloor - nearest);
        for (const f of this.assignedTargets) {
            const d = Math.abs(this.currentFloor - f);
            if (d < bestDist) {
                bestDist = d;
                nearest = f;
            }
        }
        return nearest;
    }

    handleArrival() {
        const floor = this.currentFloor;
        if (this.passengers.length) {
            const before = this.passengers.length;
            this.passengers = this.passengers.filter(p => {
                if (p.destinationFloor === floor) {
                    this.log(`👋 Passenger of ${p.weight}kg alighted at floor ${floor}`);
                    return false;
                }
                return true;
            });
            const after = this.passengers.length;
            if (before !== after) {
                this.log(`Passengers alighted: ${before - after}`);
            }
        }

        const idx = this.assignedTargets.indexOf(floor);
        if (idx !== -1) {
            this.assignedTargets.splice(idx, 1);
            this.log(`Target floor ${floor} cleared from assigned targets.`);
        }

        const boarded = this.system.boardPassengersAtFloor(this, floor);
        if (boarded.length) {
            boarded.forEach(p => this.log(`🧑‍🤝‍🧑 Boarded passenger ${p.weight}kg -> dest ${p.destinationFloor}`));
        }
    }

    tryBoardPassenger(passenger) {
        const currentPeople = this.passengers.length;
        const currentWeight = this.passengers.reduce((s, p) => s + p.weight, 0);
        if (currentPeople + 1 > this.maxPeople) {
            this.log(`❌ Cannot board passenger ${passenger.weight}kg - capacity people exceeded`);
            return false;
        }
        if (currentWeight + passenger.weight > this.maxWeight) {
            this.log(`❌ Cannot board passenger ${passenger.weight}kg - weight limit exceeded`);
            return false;
        }
        this.passengers.push(passenger);
        this.assignTarget(passenger.destinationFloor);
        return true;
    }

    isAvailableForRequest(requestFloor, requestDirection) {
        const currentPeople = this.passengers.length;
        const currentWeight = this.passengers.reduce((s, p) => s + p.weight, 0);
        if (currentPeople >= this.maxPeople || currentWeight >= this.maxWeight) return false;

        if (this.direction === "idle" || this.state instanceof CloseDoorState) return true;

        if (this.direction === requestDirection) {
            if (requestDirection === "up" && this.currentFloor <= requestFloor) return true;
            if (requestDirection === "down" && this.currentFloor >= requestFloor) return true;
        }
        return false;
    }

    processPendingAssignments() {
        this.system.tryAssignPendingRequests();
    }
}



class Request {
    constructor(originFloor, destinationFloor, weight = 70) {
        this.originFloor = originFloor;
        this.destinationFloor = destinationFloor;
        this.weight = weight;
        this.requestDirection = (destinationFloor > originFloor) ? "up" : (destinationFloor < originFloor ? "down" : "idle");
        this.id = Request._nextId++;
    }
}
Request._nextId = 1;

class ElevatorSystem {
    constructor(numElevators = 3, totalFloors = 10) {
        this.totalFloors = totalFloors;
        this.elevators = [];
        this.pendingRequests = [];
        this.waitingPassengersByFloor = {};

        for (let i = 1; i <= numElevators; i++) {
            const e = new Elevator(i, totalFloors, this);
            this.elevators.push(e);
        }
        this.tickCount = 0;
    }

    log(msg) {
        console.log(`[System] ${msg}`);
    }

    requestElevator(originFloor, destinationFloor, weight = 70) {
        const req = new Request(originFloor, destinationFloor, weight);
        this.log(`New request #${req.id} from floor ${originFloor} -> ${destinationFloor} (${req.requestDirection}) weight=${weight}kg`);
        this.waitingPassengersByFloor[originFloor] = this.waitingPassengersByFloor[originFloor] || [];
        this.waitingPassengersByFloor[originFloor].push({
            weight,
            destinationFloor,
            requestId: req.id
        });

        const assigned = this.tryAssignRequest(req);
        if (!assigned) {
            this.log(`Request #${req.id} could not be assigned immediately — queued`);
            this.pendingRequests.push({ req, timestamp: Date.now() });
        }
        return req.id;
    }

    findBestElevatorFor(req) {
        const origin = req.originFloor;
        const dir = req.requestDirection;

        const candidates = [];
        for (const e of this.elevators) {
            const currentPeople = e.passengers.length;
            const currentWeight = e.passengers.reduce((s, p) => s + p.weight, 0);
            if (currentPeople >= e.maxPeople || currentWeight + req.weight > e.maxWeight) {
                continue;
            }

            let score = Math.abs(e.currentFloor - origin);

            if (e.direction === "idle") score -= 2;

            if (e.direction === dir) {
                if ((dir === "up" && e.currentFloor <= origin) || (dir === "down" && e.currentFloor >= origin)) {
                    score -= 1;
                } else {
                    score += 2;
                }
            } else if (e.direction !== "idle") {
                score += 5;
            }

            candidates.push({ e, score });
        }

        if (candidates.length === 0) return null;
        candidates.sort((a, b) => a.score - b.score);
        return candidates[0].e;
    }

    tryAssignRequest(req) {
        const best = this.findBestElevatorFor(req);
        if (!best) return false;
        best.assignTarget(req.originFloor);
        if (best.currentFloor === req.originFloor) {
            best.setState(new OpenDoorState());
        }
        return true;
    }

    tryAssignPendingRequests() {
        if (!this.pendingRequests.length) return;
        const stillPending = [];
        for (const item of this.pendingRequests) {
            const req = item.req;
            const assigned = this.tryAssignRequest(req);
            if (!assigned) {
                stillPending.push(item);
            } else {
                this.log(`Assigned pending request #${req.id}`);
            }
        }
        this.pendingRequests = stillPending;
    }


    boardPassengersAtFloor(elevator, floor) {
        const waiting = this.waitingPassengersByFloor[floor] || [];
        if (!waiting.length) return [];

        const boarded = [];
        const remainingWaiting = [];
        for (const p of waiting) {
            if (elevator.tryBoardPassenger({ weight: p.weight, destinationFloor: p.destinationFloor })) {
                boarded.push(p);
            } else {
                remainingWaiting.push(p);
            }
        }
        if (remainingWaiting.length) {
            this.waitingPassengersByFloor[floor] = remainingWaiting;
        } else {
            delete this.waitingPassengersByFloor[floor];
        }
        return boarded;
    }

    async step() {
        this.tickCount++;
        this.log(`--- Tick ${this.tickCount} ---`);
        for (const e of this.elevators) {
            e.tick();
        }
        this.tryAssignPendingRequests();
    }

    async runSimulation(ticks = 20, delayMs = 300) {
        for (let i = 0; i < ticks; i++) {
            await this.step();
            await new Promise(r => setTimeout(r, delayMs));
        }
        this.log("Simulation finished.");
    }
}


async function demo() {
    const system = new ElevatorSystem(3, 15);

    system.requestElevator(1, 7, 80);
    system.requestElevator(3, 10, 65);
    system.requestElevator(5, 2, 90);
    system.requestElevator(10, 1, 75);

    await system.runSimulation(12, 200);

    system.requestElevator(2, 12, 200);
    system.requestElevator(2, 8, 210);
    system.requestElevator(2, 4, 220);

    await system.runSimulation(18, 200);

    system.log("Final elevator statuses:");
    for (const e of system.elevators) {
        e.reportStatus();
    }
}

demo().catch(err => console.error(err));
