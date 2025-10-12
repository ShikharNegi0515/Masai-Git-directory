class Observer {
    update() {
        throw new Error("Method 'update()' must be implemented");
    }
}

class Smartphone extends Observer {
    update() {
        console.log("Smartphone received notification");
    }
}

class Tablet extends Observer {
    update() {
        console.log("Tablet received notification");
    }
}

class NotificationCenter {
    constructor() {
        this.observers = [];
    }

    attach(observer) {
        this.observers.push(observer);
        console.log(`Observer added: ${observer.constructor.name}`);
    }

    detach(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
        console.log(`Observer removed: ${observer.constructor.name}`);
    }

    notify() {
        this.observers.forEach(observer => observer.update());
    }
}

const notificationCenter = new NotificationCenter();

const phone = new Smartphone();
const tab = new Tablet();

notificationCenter.attach(phone);
notificationCenter.attach(tab);

notificationCenter.notify();
