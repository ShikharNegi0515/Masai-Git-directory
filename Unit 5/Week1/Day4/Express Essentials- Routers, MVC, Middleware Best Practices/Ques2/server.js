const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");

app.use(express.json());

// Routes
app.use("/tickets", ticketRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
