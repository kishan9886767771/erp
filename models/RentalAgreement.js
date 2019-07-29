
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.RentalAgreement;
var Schema = mongoose.Schema;

var RentalAgreementSchema = new Schema({
    
    unit: { type : mongoose.Schema.Types.ObjectId, ref: "Unit" }, //need auto complete field

    tenant: { type : mongoose.Schema.Types.ObjectId, ref: "Tenant" },  //need auto complete field

    dateOfCreation : { type : Date, required : true }, // creation of document as per paper record

    dateOfRegistration : { type : Date, required : true }, // registration as per deed

    dateOfExpiry: { type : Date, required : true }, // for renewal reminder
    
    dateOfEscalation: { type : Date, required : true }, // for ecalation reminder

    rate : { type : Number, required : true},

    escalationNotes : { type : String, required : false},

    securityDeposit : { type : Number, required : false},

    documents: [{ type : String, required : false, default : null }], //relative link to static file

    valid: { type : Boolean, default : true }, //if invalid do not notify

},
{
    timestamps: true
});


RentalAgreementSchema.statics.createRentalAgreement = function(rental, cb)
{
    rental.save(cb);
};

var RentalAgreement = mongoose.model(SchemaPlainTextName, RentalAgreementSchema);
module.exports = RentalAgreement;