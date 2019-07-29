
var mongoose = require('mongoose');
var bcryptjs = require('bcryptjs')

var settings = require('../config/settings');
var Counter = require('./Counter');
var SchemaPlainTextName = settings.SchemaPlainTextName.User;
var bcryptPasswordSecret = settings.bcryptPasswordSecret;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username:  { type: String, lowercase: true, unique: true },

    uid : { type : Number, unique: true, default: 0}, //not visible in dashboard but for our internal refernce hidden

    password: { type : String, required : true, min: 8}, // do not store as clear text
    firstName: { type : String, required : true, trim : false, lowercase : false }, 
    lastName: { type : String, required : false, trim : false, lowercase : false },
    mobileNumber : { type : Number, required : false, trim : true, min:10, default:null},
    email : { type : String, required : true, lowercase : true },
    
    //gender: { type : String, required : false, lowercase : true, trim : true, enum : ['male','female','other']}, 
    
    role:  { type : Number, required : true }, // defined in settings.js    
    lastLogin : { type : Date, default : null }, // for use internally show under user management table column

    // Requested OTP CODE used to reset password send to email
    otpSentTime      : { type : Date, required : false, default : null }, //valid for 1 hour
    otpRequestedCode : { type : Number, required : false, trim : true, default : null},

    //Reminders Preferences
    escalationReminder : { type : Number, required : false, trim : true, default : 90}, // default 90 days
    renewalReminder : { type : Number, required : false, trim : true, default : 30} // default 30 days

},
{
    timestamps: true
});

UserSchema.statics.userExists = function(username, cb)
{
    return this.findOne({ username: username }, cb);
};

UserSchema.statics.createUser = function(user, cb)
{
    user.save(cb);
};

UserSchema.statics.hashPassword = function hashPassword( password ){
    return bcryptjs.hashSync( password, bcryptPasswordSecret );
};

UserSchema.methods.isValid = function(hashedPassword){
    return bcryptjs.compareSync(hashedPassword, this.password);
};

UserSchema.pre('save', function(next) {
    var doc = this;
    var startCounter = 1;
    // var Counter = mongoose.model('counter',UserSchema);
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

var User = mongoose.model(SchemaPlainTextName, UserSchema);
module.exports = User;