
var mongoose = require('mongoose');

var settings = require('../config/settings');
var SchemaPlainTextName = settings.SchemaPlainTextName.Tenant;
var Schema = mongoose.Schema;

//this is the client profile
var TenantSchema = new Schema({
    uid : { type : Number, unique: true, default: 0},

    name: { type : String, required : true, trim : false},
    addressLine1: { type : String, required : true, trim : false}, 
    addressLine2: { type : String, required : true, trim : false}, 
    city: { type : String, required : true, trim : false}, 
    state: { type : String, required : true, trim : false}, 
    pincode: { type : String, required : true, trim : false}, 

    phoneNo: [{ type : Number, required : false, trim : true, min:8, default:null}], // array of numbers
    mobileNo: [{ type : Number, required : false, trim : true, min:10, default:null}],
    email: [{ type : String, required : false, trim : false}], 
    
    bankDetails: { type : String, required : false, trim : false}, 
    
    documents: [{ type : String, required : false, default : null }], //attachments

    GSTIN: { type : String, required : false, trim : false}, 
    
},
{
    timestamps: true
});

TenantSchema.statics.createTenant = function(tenant, cb)
{
    tenant.save(cb);
};

TenantSchema.pre('save', function(next) {
    var doc = this;
    var startCounter = 1;
    Counter.findOneAndUpdate({name: SchemaPlainTextName}, {$inc: { value: 1} }, { upsert: true }, function(error, counter)   {
        if(error)
            return next(error);

        if(counter == null)
        {
            doc.uid = startCounter;

            Counter.findOneAndUpdate({name: SchemaPlainTextName}, {value: startCounter }, { upsert: true }, function(error, counter)   {
                if(error)
                    return next(error);

                next();
            });

        } else {
            doc.uid = counter.value + 1;
            next();
        }
    });
});

var Tenant = mongoose.model(SchemaPlainTextName, TenantSchema);
module.exports = Tenant;