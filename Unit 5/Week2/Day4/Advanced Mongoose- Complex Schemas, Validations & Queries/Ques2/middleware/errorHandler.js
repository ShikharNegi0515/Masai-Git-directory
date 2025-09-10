function errorHandler(err, req, res, next) {
    console.error(err);

    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages.join(", ") });
    }

    if (err.name === "CastError" && err.kind === "ObjectId") {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    res.status(500).json({ message: err.message || "Internal Server Error" });
}

module.exports = errorHandler;
