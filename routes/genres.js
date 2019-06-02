const express = require('express');
const router = express.Router();

var genres = [
    {id: 1, name: 'horror'},
    {id: 2, name: 'drama'},
    {id: 3, name: 'action'},
    {id: 4, name: 'advanture'}
];

// GET
// all genres
router.get('/', (req, res) => {
    res.send(genres);
});
// by id
router.get('/:id', (req, res) => {
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`);
    else res.send(genre);
});

// POST
router.post('/', (req, res) => {
    let { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    genres.push(genre);
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
router.put('/:id', (req, res) => {
    // 1. lookup the genre
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`);
    
    // validate
    let { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // 3. update
    genre.name = req.body.name;
    res.send(genre);
});

// DELETE
router.delete('/:id', (req, res) => {
    // 1. lookup the genre
    let genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send(`Genre ID ${req.params.id} cannot find`); 

    // 2. delete
    let index = genres.indexOf(genre);
    genres.splice(index);

    res.send(genre);
});

module.exports = router;