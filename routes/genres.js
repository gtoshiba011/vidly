const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const express = require('express');
const router = express.Router();
const { Genre, validateGenre } = require('../models/genre'); // object de-structure

// GET
// all genres
router.get('/', async (req, res) => {
    // throw new Error('Could not get genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});
// by id
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`);
    else res.send(genre);
});

// POST
router.post('/', auth, async (req, res) => {
    let { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    await genre.save();

    res.send(genre);
});

// PUT
router.put('/:id', async (req, res) => {
    // validate
    let { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // use update first method
    const genre = await Genre.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true });

    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`);
    
    res.send(genre);
});

// DELETE
router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id, { useFindAndModify: false });

    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`); 

    res.send(genre);
});

module.exports = router;