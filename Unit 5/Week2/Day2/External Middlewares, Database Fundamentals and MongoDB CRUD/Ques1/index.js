const express = require("express");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = 3000;

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,  
    max: 5,                   
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,    
});

app.use("/api/public", apiRoutes);

app.use("/api/limited", limiter, apiRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
