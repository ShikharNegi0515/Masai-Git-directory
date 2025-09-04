const { readDB, writeDB } = require("../models/employeeModel");

exports.getEmployees = (req, res) => {
    const db = readDB();
    res.json(db.employees);
};

exports.addEmployee = (req, res) => {
    const { name, position, department, salary, status } = req.body;
    if (!name || !position || !department || !salary || !status) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const db = readDB();
    const id = db.employees.length ? db.employees[db.employees.length - 1].id + 1 : 1;

    const newEmployee = { id, name, position, department, salary, status };
    db.employees.push(newEmployee);
    writeDB(db);

    res.status(201).json(newEmployee);
};

exports.updateEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const db = readDB();
    const idx = db.employees.findIndex(emp => emp.id === id);

    if (idx === -1) return res.status(404).json({ error: "Employee not found" });

    db.employees[idx] = { ...db.employees[idx], ...req.body };
    writeDB(db);

    res.json(db.employees[idx]);
};

exports.deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const db = readDB();
    const before = db.employees.length;

    db.employees = db.employees.filter(emp => emp.id !== id);

    if (db.employees.length === before) {
        return res.status(404).json({ error: "Employee not found" });
    }

    writeDB(db);
    res.json({ message: "Employee deleted" });
};
