const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.router");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/user-address-system", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

app.use("/users", userRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
