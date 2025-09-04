const { readDB, writeDB } = require("../models/ticketModel");

function getAllTickets(req, res) {
    const db = readDB();
    res.json(db.tickets);
}

function getTicketById(req, res) {
    const db = readDB();
    const ticket = db.tickets.find(t => t.id == req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });
    res.json(ticket);
}

function createTicket(req, res) {
    const db = readDB();
    const newTicket = {
        id: db.tickets.length + 1,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        user: req.body.user,
        status: "pending"
    };
    db.tickets.push(newTicket);
    writeDB(db);
    res.status(201).json(newTicket);
}

function updateTicket(req, res) {
    const db = readDB();
    const ticket = db.tickets.find(t => t.id == req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.title = req.body.title || ticket.title;
    ticket.description = req.body.description || ticket.description;
    ticket.priority = req.body.priority || ticket.priority;

    writeDB(db);
    res.json(ticket);
}

function deleteTicket(req, res) {
    const db = readDB();
    const index = db.tickets.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Ticket not found" });

    const deleted = db.tickets.splice(index, 1);
    writeDB(db);
    res.json({ message: "Ticket deleted", deleted });
}

function resolveTicket(req, res) {
    const db = readDB();
    const ticket = db.tickets.find(t => t.id == req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket not found" });

    ticket.status = "resolved";
    writeDB(db);
    res.json(ticket);
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket,
    resolveTicket
};
