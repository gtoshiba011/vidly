const mongoose = require('mongoose');
const Joi = require('joi');
const {genreSchema} = require('./genre');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0
    }
});
const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    // Joi schema
    const schema = {
        title: Joi.string().min(1).max(255).required(),
        genreId: Joi.string().required(), // validate the input from user -> use string
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }

    return Joi.validate(movie, schema);
}
module.exports.Movie = Movie;
module.exports.validate = validateMovie;
