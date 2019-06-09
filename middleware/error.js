const winston = require('winston');

// only works when error happens in request processing pipline

// catch the excpetion in express
module.exports = function (err, req, res, next) {
    // Log the exception
    winston.error(err.message, err); // or winston.log('error', ...);

    res.status(500).send('Internal system error.');
};