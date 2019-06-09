const winston = require('winston');
const express = require('express');
const app = express();
const dbDebugger = require('debug')('app:db');

// *** call startup function
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/config')();
require('./startup/validate')();

// *** test - throw an Error
// 1. can be caught by process.on('uncaughtException')
//throw new Error('Something wrong when starting...');
// 2. cannot be caught by porcess.on('uncaughtException')
//const p = Promise.reject(new Error('Async error'));
//p.then(() => console.log('Done'));

// GET
// homepage
app.get('/', (req, res) => {
    res.send('Welcome to Genres Homepage!');
});

// router listen...
const port = process.env.PORT || 3000;
app.listen(port, () => {
    winston.info(`Now listening on port ${port}...`);
});