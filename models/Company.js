
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Company;
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    uid : { type : Number, unique: true, default: 0},
    
    name: { type : String, required : true, trim : false}, //textbox
    addressLine1: { type : String, required : false, trim : false}, //textbox
    addressLine2: { type : String, required : false, trim : false}, //textbox
    city: { type : String, required : false, trim : false}, //textbox
    state: { type : String, required : false, trim : false}, //textbox
    pincode: { type : String, required : false, trim : false}, //textbox

    phoneNo: [{ type : Number, required : false, trim : true, min:8, default:null}], // array of numbers
    mobileNo: [{ type : Number, required : false, trim : true, min:8, default:null}],
    email: { type : String, required : false, trim : false}, //textbox
    
    panNumber: { type : String, required : false, trim : false}, //textbox
    accountNumber: { type : String, required : false, trim : false}, //textbox
    IFSC: { type : String, required : false, trim : false}, //textbox
    GSTIN: { type : String, required : false, trim : false}, //textbox
    //HSN: { type : String, required : false, trim : false}, 
    bankName: { type : String, required : false, trim : false}, //textbox
    bankBranch: { type : String, required : false, trim : false}, //textbox
    notes: { type : String, required : false, trim : false} //text area

},
{
    timestamps: true
});


CompanySchema.statics.createCompany = function(company, cb)
{
    company.save(cb);
};

var Company = mongoose.model(SchemaPlainTextName, CompanySchema);
module.exports = Company;