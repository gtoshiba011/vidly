
function admin(req, res, next) {
    // 401 unauthorized (invalid token)
    // 403 forbidden (not admin)

    if(!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}

module.exports = admin;