const express = require('express');
const router = express.Router();
const { Customer, validateCustomer } = require('../models/customer'); // object de-structure

// GET
// all genres
router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
// by id
router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id);

    if(!customer) return res.status(404).send(`Customer ID ${req.params.id} cannot find`);
    else res.send(customer);
});

// POST
router.post('/', async (req, res) => {
    let { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    await customer.save();

    res.send(customer);
});

// PUT
router.put('/:id', async (req, res) => {
    // validate
    let { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // use update first method
    const customer = await Customer.findByIdAndUpdate({ _id: req.params.id }, { name: req.body.name, phone: req.body.phone, isGold: req.body.isGold }, { new: true });

    if(!customer) return res.status(404).send(`Customer ID ${req.params.id} cannot find`);
    
    res.send(customer);
});

// DELETE
router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id, { useFindAndModify: false });

    if(!customer) return res.status(404).send(`Customer ID ${req.params.id} cannot find`); 

    res.send(customer);
});

module.exports = router;