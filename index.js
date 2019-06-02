const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');

// middleware function
app.use(express.json());
app.use('/api/genres', genres);

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