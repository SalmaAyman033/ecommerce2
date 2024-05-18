const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRET = process.env.SECRET;

function verifyToken(req, res, next) {
    const token = req.cookies.jwt;
    if (!token) return res.redirect("/api/v1/user/login");
    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.redirect("/api/v1/user/login");
    }
};

module.exports = verifyToken;