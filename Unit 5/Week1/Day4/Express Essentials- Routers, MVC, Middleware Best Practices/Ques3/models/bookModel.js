const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db.json");

function readDB() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDB(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = { readDB, writeDB };
