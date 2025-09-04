const express = require("express");
const logger = require("./middlewares/loggerMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

app.use((req, res) => res.status(404).json({ error: "404 Not Found" }));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
