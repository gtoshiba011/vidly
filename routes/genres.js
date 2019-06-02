const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    }
});
const Genre = mongoose.model('Genre', genreSchema);

//var genres = [
//    {id: 1, name: 'horror'},
//    {id: 2, name: 'drama'},
//    {id: 3, name: 'action'},
//    {id: 4, name: 'advanture'}
//];

// GET
// all genres
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
    let { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);
});

function validateGenre(genre) {
    // Joi schema
    const schema = {
        name: Joi.string().min(1).required()
    };
    return Joi.validate(genre, schema);
}

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
router.delete('/:id', async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`); 

    res.send(genre);
});

module.exports = router;