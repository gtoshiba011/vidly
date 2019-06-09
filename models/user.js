const mongoose = require('mongoose');
const Joi = require('joi');

// useful package for password
// 1. joi-password-complexity - enforce complexity to password
// 2. bcrypt - hash the password

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
});
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    // Joi schema
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;