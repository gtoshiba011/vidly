// use middleware to handle async reject
// but now can use package express-async-errors

module.exports = function(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        } catch (err) {
            next(err);
        }
    }
}