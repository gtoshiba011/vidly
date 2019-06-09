const winston = require('winston'); // log the excpetion
require('winston-mongodb');
require('express-async-errors'); // handle async error

module.exports = function() {
    
    // *** uncaught exception
    // 1. only catch the uncaught excpetion in Node
    // 2. can use winston.handleExcpetion to replace process.on
    // 3. will terminate the process
    //process.on('uncaughtException', (error) => {
    //    console.log('GOT AN UNCAUGHT EXCEPTION in Node');
    //    winston.error(error.message, error);
    //    process.exit(1);
    //});
    winston.handleExceptions(
        // every Exception / Error will be caught and print into 'uncaughtException.log'
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtException.log' })
    );
    
    // *** unhandled exception
    // 1. can catch async unhandled rejection
    process.on('unhandledRejection', (error) => {
        // will be caught by winston.handleExcpetions() above
        throw error;
        //console.log('GOT AN UNHANDLED REJECTION in Node');
        //winston.error(error.message, error);
        //process.exit(1);
    });

    // winston.error or .info will output to the following file/db
    winston.add(winston.transports.File, { filename: 'logFile.log' });
    winston.add(winston.transports.MongoDB, {
        db: 'mongodb://localhost/vidly',
        level: 'info'
        // logging level
        // 1. error
        // 2. warning
        // 3. info
        // 4. verbose
        // 5. debug
        // 6. silly
    });
    // used for newer version of winston
    //winston.add(new winston.transports.File({ filename: 'logFile.log' }));
    //winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly' }));
}