const jwt = require('jsonwebtoken');
const config = require('config');


// authorization
function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decode = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
        // in middleware function, either terminate responds life cycle or pass to the next
    }
}

module.exports = auth;