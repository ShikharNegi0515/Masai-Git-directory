const express = require("express");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/employees", employeeRoutes);

app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
    console.log(`🚀 Employee Management API running at http://localhost:${PORT}`);
});
