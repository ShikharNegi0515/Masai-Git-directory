// Import EventEmitter from Node.js
const EventEmitter = require("events");

// Create a new EventEmitter instance
const eventBus = new EventEmitter();

// ----------------------
// Event Listeners
// ----------------------

// userLoggedIn event can have multiple listeners
eventBus.on("userLoggedIn", (username) => {
    console.log(`> User ${username} logged in`);
});
eventBus.on("userLoggedIn", (username) => {
    console.log(`> Notification sent to ${username}`);
});

// messageReceived event
eventBus.on("messageReceived", (from, message) => {
    console.log(`> New message from ${from}: "${message}"`);
});

// dataSynced event with multiple stages
eventBus.on("dataSyncStart", (username) => {
    console.log(`> Syncing ${username}'s data...`);
});
eventBus.on("dataSyncComplete", (username) => {
    console.log(`> Data sync complete for ${username}`);
});

// ----------------------
// Simulated Real-Time Flow
// ----------------------
function simulateApp() {
    const user = "John";

    // Simulate user login
    setTimeout(() => {
        eventBus.emit("userLoggedIn", user);

        // Simulate message received after login
        setTimeout(() => {
            eventBus.emit("messageReceived", "Alice", "Hey John, how are you?");
        }, 1000);

        // Simulate data sync after login
        setTimeout(() => {
            eventBus.emit("dataSyncStart", user);

            setTimeout(() => {
                eventBus.emit("dataSyncComplete", user);
            }, 1500);
        }, 2000);
    }, 500);
}

// Run the simulation
simulateApp();
