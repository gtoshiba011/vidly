const express = require('express');
const router = express.Router();
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const { Rental, validateRental } = require('../models/rental');

// GET /api/rentals
// get all rentals
router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

// POST /api/rentals
router.post('/', async (req, res) => {
    let { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send(`Invalid movie ${req.body.movieId}`);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send(`Invalid customer ${req.body.customerId}`);

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
        },
    });
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

module.exports = router;