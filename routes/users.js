const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const router = express.Router();
const { User, validateUser } = require('../models/user'); // object de-structure

// POST
router.post('/', async (req, res) => {
    let { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // check duplicate email
    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered');

    // use lodash
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10) // return a promise
    user.password = await bcrypt.hash(user.password, salt);
    //user = new User({
    //    name: req.body.name,
    //    email: req.body.email,
    //    password: req.body.password
    //});
    await user.save();

    // do not show password to user
    // use lodash
    res.send(_.pick(user, ['_id', 'name', 'email']))
    //res.send({
    //    name: user.name,
    //    email: user.email
    //});
});

//// GET
//// all users
//router.get('/', async (req, res) => {
//    const users = await User.find().sort('name');
//    res.send(users);
//});
//// by id
//router.get('/:id', async (req, res) => {
//
//    const user = await User.findById(req.params.id);
//
//    if(!user) return res.status(404).send(`User ID ${req.params.id} cannot find`);
//    else res.send(_.pick(user, ['_id', 'name', 'email']));
//});
//
//// PUT
//router.put('/:id', async (req, res) => {
//    // validate
//    let { error } = validateUser(req.body);
//    if(error) return res.status(400).send(error.details[0].message);
//
//    // use update first method
//    const user = await User.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name }, { new: true });
//
//    if(!user) return res.status(404).send(`User ID ${req.params.id} cannot find`);
//    
//    res.send(user);
//});
//
//// DELETE
//Router.delete('/:id', async (req, res) => {
//
//    const user = await User.findByIdAndRemove(req.params.id, { useFindAndModify: false });
//
//    if(!user) return res.status(404).send(`User ID ${req.params.id} cannot find`); 
//
//    res.send(user);
//});

module.exports = router;