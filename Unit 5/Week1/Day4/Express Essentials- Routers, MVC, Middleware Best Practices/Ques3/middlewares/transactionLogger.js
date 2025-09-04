module.exports = function transactionLogger(req, res, next) {
    const t = res.locals.transaction;
    if (t) {
        const ts = new Date().toISOString().replace("T", " ").split(".")[0];
        const verb = t.action === "borrow" ? "borrowed" : "returned";
        console.log(`[${ts}] ${t.readerName} ${verb} "${t.title}"`);
    }
    if (res.locals.payload) return res.status(200).json(res.locals.payload);
    next();
};
