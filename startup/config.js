const config = require('config');

module.exports = function() {
// check env variable
    if(!config.get('jwtPrivateKey')) {
        // will be caught by winston.handleExceptions in logging.js
        throw new Error('FATAL ERROR: env variable jwtPrivateKey is not defined');
    }
}