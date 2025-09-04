module.exports = function logger(req, _res, next) {
    const ts = new Date().toISOString().replace("T", " ").split(".")[0];
    console.log(`[${ts}] ${req.method} ${req.originalUrl}`);
    next();
};
