const express = require('express');
const router = express.Router();
const { Movie, validateMovie } = require('../models/movie');
const { Genre } = require('../models/genre');

// GET
// all movies
router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('title');
    res.send(movies);
});
// by id
router.get('/:id', async (req, res) => {

    const movie = await Movie.findById(req.params.id);

    if(!movie) return res.status(404).send(`Movie ID ${req.params.id} cannot find`);
    else res.send(movie);
});

// POST
router.post('/', async (req, res) => {
    let { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send(`Invalid genre ${req.body.genreId}`);

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    await movie.save();

    res.send(movie);
});

// PUT
router.put('/:id', async (req, res) => {
    // validate
    let { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // use update first method
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(400).send(`Invalid genre ${req.body.genreId}`);
    
    const movie = await Movie.findByIdAndUpdate({ _id: req.params.id }, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if(!movie) return res.status(404).send(`Movie ID ${req.params.id} cannot find`);
    
    res.send(movie);
});

// DELETE
router.delete('/:id', async (req, res) => {

    const movie = await Movie.findByIdAndRemove(req.params.id, { useFindAndModify: false });

    if(!movie) return res.status(404).send(`Movie ID ${req.params.id} cannot find`); 

    res.send(movie);
});

module.exports = router;