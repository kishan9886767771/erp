
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Counter;

var CounterSchema = new Schema({
        name: String, // this is the name of a model we use this collection to generate unique ids for the other models
        value: Number
    });

var Counter = mongoose.model(SchemaPlainTextName, CounterSchema);
module.exports = Counter;