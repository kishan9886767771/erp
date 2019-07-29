
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Unit;
var Schema = mongoose.Schema;

var UnitSchema = new Schema({
    uid : { type : Number, unique: true, default: 0}, //hidden feild All other fields are visible

    unitNo: { type : String, required : true, trim : false},
    hasParent: { type : Boolean, default : false }, //Units can be children of other units
    parent:  { type : mongoose.Schema.Types.ObjectId, ref: "Unit" }, // refers to another unit which is the parent of this unit used for reports need auto complete field
    
    addressLine1: { type : String, required : false, trim : false}, 
    addressLine2: { type : String, required : false, trim : false}, 
    city: { type : String, required : false, trim : false}, 
    state: { type : String, required : false, trim : false}, 
    pincode: { type : String, required : false, trim : false},

    documents: [{ type : String, required : false, default : null }], //attachments

    area: { type : Number, required : true}, // area in sq feet

    company : [{ type : mongoose.Schema.Types.ObjectId, ref: "Company" }], //which company is owner could be multiple need auto complete field

    percentageOwnership : [{ type : Number}], // used in invoice preparation in case there are multiple owners
},
{
    timestamps: true
});

UnitSchema.statics.createUnit = function(unit, cb)
{
    unit.save(cb);
};

var Unit = mongoose.model(SchemaPlainTextName, UnitSchema);
module.exports = Unit;