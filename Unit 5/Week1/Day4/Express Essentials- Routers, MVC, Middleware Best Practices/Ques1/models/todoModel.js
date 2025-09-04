const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

// Read data
const readData = () => {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ todos: [] }, null, 2));
    }
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

// Write data
const writeData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
