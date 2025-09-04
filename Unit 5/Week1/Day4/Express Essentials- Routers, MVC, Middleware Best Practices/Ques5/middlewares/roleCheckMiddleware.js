function roleCheck(allowedRoles) {
    return (req, res, next) => {
        const role = req.headers["x-role"];

        if (!role) return res.status(401).json({ error: "Role header missing" });
        if (!allowedRoles.includes(role)) {
            return res.status(403).json({ error: "Access denied" });
        }

        next();
    };
}

module.exports = roleCheck;
