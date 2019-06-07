const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const dbDebugger = require('debug')('app:db');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
    .then(() => dbDebugger('Connected to MongoDB...'))
    .catch(err => dbDebugger('Fail to connect to MongoDB...', err));


// middleware function
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

// GET
// homepage
app.get('/', (req, res) => {
    res.send('Welcome to Genres Homepage!');
});

// router listen...
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Now listening on port ${port}...`);
});