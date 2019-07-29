
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Invoice;
var Schema = mongoose.Schema;

var InvoiceSchema = new Schema({
    
    refNo : { type : String, required : true, default : null }, //date +  client id + unit id + Type Eg 2019-03-001-033-M YYYY-MM-ClientID-UnitID-Maintenance
    
    tenant : { type : mongoose.Schema.Types.ObjectId, ref: "Tenant" },

    unit : { type : mongoose.Schema.Types.ObjectId, ref: "Unit" },

    date : { type : Date, required : true }, // invoice date is set manually
    
    type : { type : String, required : false, lowercase : true, trim : true, enum : ['rent','diesel','maintenance', 'electricity']},  

    items : [{ type : String, required : false}],  

    amounts : [{ type : Number }], // amount corresponding to each item

    total : { type : Number }, // total amount

    content: { type : String, required : false, default : null }, 

    valid: { type : Boolean, default : true }, //if invalid do not notify
    
    paid: { type : Boolean, default : false }, 
    
    HSN: { type : String, required : false, trim : false}, //if this field has a value given then add it to the invoice

    attachments: [{ type : String, required : false, default : null }], //relative link to static file

    createdBy: { type : mongoose.Schema.Types.ObjectId, ref: "User" }, //hidden

    lastEditedBy: { type : mongoose.Schema.Types.ObjectId, ref: "User" }, //hidden
},
{
    timestamps: true
});


InvoiceSchema.statics.createInvoice = function(invoice, cb)
{
    invoice.save(cb);
};

var Invoice = mongoose.model(SchemaPlainTextName, InvoiceSchema);
module.exports = Invoice;