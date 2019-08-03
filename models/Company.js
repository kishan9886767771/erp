
var mongoose = require('mongoose');
var Counter = require('./Counter');
var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Company;
var Schema = mongoose.Schema;

var CompanySchema = new Schema({
    cid : { type : Number, unique: true, default: 0},
    
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

CompanySchema.pre('save', function(next) {
    var doc = this;
    
    var startCounter = 1;
    // var Counter = mongoose.model('counter',UserSchema);
    Counter.findOneAndUpdate({name: SchemaPlainTextName}, {$inc: { value: 1} }, { upsert: true }, function(error, counter)   {
        if(error)
            return next(error);

        if(counter == null)
        {
            doc.cid = startCounter;

            Counter.findOneAndUpdate({name: SchemaPlainTextName}, {value: startCounter }, { upsert: true }, function(error, counter)   {
                if(error)
                    return next(error);

                next();
            });

        } else {
            doc.cid = counter.value + 1;
            console.log("Pre Function: " + doc.cid);
            next();
        }
    });
});

var Company = mongoose.model(SchemaPlainTextName, CompanySchema);
module.exports = Company;