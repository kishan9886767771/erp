
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.MaintenanceItem;
var Schema = mongoose.Schema;

var MaintenanceItemSchema = new Schema({
           
    type : { type : String, required : true, unique: true},   

},
{
    timestamps: true
});


MaintenanceItemSchema.statics.createItem = function(item, cb)
{
    item.save(cb);
};

var MaintenanceItem = mongoose.model(SchemaPlainTextName, MaintenanceItemSchema);
module.exports = MaintenanceItem;