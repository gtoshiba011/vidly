const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const { User } = require('../models/user'); // object de-structure

// POST
router.post('/', async (req, res) => {
    let { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check duplicate email
    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password');

    // 1. bcrypt uses salt to hash plant password
    // 2. compare it with user.password
    const result = await bcrypt.compare(req.body.password, user.password);
    if(!result) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(user) {
    // Joi schema
    const schema = {
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    };
    return Joi.validate(user, schema);
}

module.exports = router;