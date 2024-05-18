const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'hello secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                return res.redirect('/login'); // Return to prevent further execution
            } else {
                console.log('Token is valid'); // Log before next()
                next(); // This should trigger the next middleware or route handler
            }
        });
    } else {
        return res.redirect('/login'); // Return to prevent further execution
    }
};

module.exports = { requireAuth };
