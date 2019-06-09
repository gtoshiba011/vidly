const mongoose = require('mongoose');
const Joi = require('Joi');

const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 1,
                maxlength: 255
            },
            dailyRentalRate: { 
                type: Number,
                required: true,
                min: 0
            }
        }),
        required: true
    },
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 255
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 25
            }      
        }),
        required: true
    },
    dataOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});
const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(rental) {
    const schema = {
        movieId: Joi.string().required(), // validate the input from user -> use string() only
        customerId: Joi.string().required()
    };
    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;