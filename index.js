const config = require('config');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi); // return a function
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const dbDebugger = require('debug')('app:db');

if(!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: env variable jwtPrivateKey is not defined');
    process.exit(1);
}

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => dbDebugger('Fail to connect to MongoDB...', err));


// middleware function
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// GET
// homepage
app.get('/', (req, res) => {
    res.send('Welcome to Genres Homepage!');
});

// router listen...
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}...`);
});