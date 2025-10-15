class Notification {
    send(message) {
        throw new Error("Method 'send()' must be implemented.");
    }
}

class EmailNotification extends Notification {
    send(message) {
        console.log(`Sending EMAIL: ${message}`);
    }
}

class SMSNotification extends Notification {
    send(message) {
        console.log(`Sending SMS: ${message}`);
    }
}

class PushNotification extends Notification {
    send(message) {
        console.log(`Sending PUSH: ${message}`);
    }
}

class NotificationFactory {
    static createNotification(type) {
        switch (type) {
            case "Email":
                return new EmailNotification();
            case "SMS":
                return new SMSNotification();
            case "Push":
                return new PushNotification();
            default:
                throw new Error("Unknown notification type");
        }
    }
}

const notifier = NotificationFactory.createNotification("Email");
notifier.send("Welcome!");

const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send("Your OTP is 123456");

const pushNotifier = NotificationFactory.createNotification("Push");
pushNotifier.send("You have a new message"); 
