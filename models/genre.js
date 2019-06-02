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

function validateGenre(genre) {
    // Joi schema
    const schema = {
        name: Joi.string().min(1).max(255).required()
    };
    return Joi.validate(genre, schema);
}

module.exports.Genre = Genre;
module.exports.validate = validateGenre;