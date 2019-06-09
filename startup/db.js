const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    // to prevent "DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead"
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb://localhost/vidly', { useNewUrlParser: true })
        .then(() => winston.info('Connected to MongoDB...'));
    // if cannot connect to DB, terminate the process
    //.catch(err => dbDebugger('Fail to connect to MongoDB...', err));

    //.then(() => dbDebugger('Connected to MongoDB...'))
    //.catch(err => dbDebugger('Fail to connect to MongoDB...', err));
};