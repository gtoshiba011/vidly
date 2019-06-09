const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
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
        maxlength: 255
    }
});
const Customer = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    // Joi schema
    const schema = {
        name: Joi.string().min(1).max(255).required(),
        phone: Joi.string().min(5).max(255).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
module.exports.customerSchema = customerSchema;