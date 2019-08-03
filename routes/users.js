var express = require('express');
var router = express.Router();

var User = require('../models/User');
var MaintenanceItems = require('../models/MaintenanceItem');
var Company = require('../models/Company');
var Unit = require('../models/Unit');
var Tenant = require('../models/Tenant');
var RentalAgreement = require('../models/RentalAgreement');
var Invoice = require('../models/Invoice');

var settings = require('../config/settings');
var passport = require('passport');
var AdminRole = settings.UserRoles.Admin;
var config = require('../config/config');
var fs = require('fs');
var mongodb = require('mongodb');

// Login Route
router.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return res.status(501).json(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

// Loged in user alidation Route
router.get('/validate-login',isValidUser,function(req,res,next){
  return res.status(200).json(req.user);
});

// Logout Route
router.get('/logout', isValidUser, function(req,res,next){
  req.logOut();
  return res.status(200).json({message: "Logout Success"});
});

// Route to Validate App Configrations
router.get('/validate-first-time-setup', function(req,res,next){
  if (config.initConfig === true)
    return res.status(401).json({message: "App Not configured"});
  else
    return res.status(200).json({message: "App configured"})
});

// Route to Config App
router.post('/first-time-setup',function(req,res,next){
  config.appName = req.body.appName,
  config.logoURL = req.body.appLogoURL,
  config.favIcon = req.body.appfavIcon,
  config.initConfig = false
  // Writing Data into config.json file
  fs.writeFile('./config/config.json', JSON.stringify(config), function(err) {
    if(err) {
      console.log(err)
      return res.status(501).json({message:"App Not Configured"})
    }
    else addToDB(req,res);
  });
});


// User-Management
// Route to Add User
router.post('/add-user',function(req,res,next){
  addUserToDB(req,res);
});

// Route to get all users
router.get('/get-all-users', function (req, res, next){
  User.find(function (err, users){
    if(err) return res.status(501).json({message: "Users Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Route to getUser
router.get('/get-User/:id', function (req, res){
  User.findOne({ _id: new mongodb.ObjectID(req.params.id) }, function (err, users){
    if(err) return res.status(501).json({message: "User Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Edit User Route
router.post('/edit-user',function(req,res,next){
  editUser(req,res);
});

// Route to Delete User
router.delete('/delete/:id', function (req, res) {
  User.findByIdAndRemove({_id: new mongodb.ObjectID(req.params.id)}, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  });
});

// Maintenance Items
// Route to Add Item
router.post('/add-item',function(req,res,next){
  var item = new MaintenanceItems({
    type: req.body.type
  });
  
  try{
    doc = MaintenanceItems.createItem(item);
    return res.status(201).json("Item Added To DB.");
  }
  catch(err){
    return res.status(501).json(err);
  }
});

// Route to getItem
router.get('/get-item/:id', function (req, res){
  MaintenanceItems.findOne({ _id: new mongodb.ObjectID(req.params.id) }, function (err, users){
    if(err) return res.status(501).json({message: "User Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Edit Item Route
router.post('/edit-item',function(req,res,next){
  var newvalues = { $set: {
    type: req.body.type,
  } }; 

  MaintenanceItems.findByIdAndUpdate({ _id: req.body.id }, newvalues, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  })
});

// Route to Delete Item
router.delete('/delete-item/:id', function (req, res) {
  MaintenanceItems.findByIdAndRemove({_id: new mongodb.ObjectID(req.params.id)}, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  });
});

// Route to get all maintenance items
router.get('/get-all-maintenance-items', function (req, res, next){
  MaintenanceItems.find(function (err, users){
    if(err) return res.status(501).json({message: "Maintenance Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Companies
// Route to Add Item
router.post('/add-company',function(req,res,next){
  req.body.phoneNo = req.body.phoneNo.map(function (item) { return item.phoneNo; });
  req.body.mobileNo = req.body.mobileNo.map(function (item) { return item.mobileNo; });
  addCompanyToDB(req,res);
});

// Route to getCompany
router.get('/get-company/:id', function (req, res){
  Company.findOne({ _id: new mongodb.ObjectID(req.params.id) }, function (err, users){
    if(err) return res.status(501).json({message: "User Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Edit Item Route
router.post('/edit-company',function(req,res,next){
  req.body.phoneNo = req.body.phoneNo.map(function (item) { return item.phoneNo; });
  req.body.mobileNo = req.body.mobileNo.map(function (item) { return item.mobileNo; });
  var newvalues = { $set: {
    name: req.body.name,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    phoneNo: req.body.phoneNo,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    panNumber: req.body.panNumber,
    accountNumber: req.body.accountNumber,
    IFSC: req.body.IFSC,
    GSTIN: req.body.GSTIN,
    bankName: req.body.bankName,
    bankBranch: req.body.bankBranch,
    notes: req.body.notes
  } }; 

  Company.findByIdAndUpdate({ _id: req.body.id }, newvalues, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  })
});

// Route to Delete Item
router.delete('/delete-company/:id', function (req, res) {
  Company.findByIdAndRemove({_id: new mongodb.ObjectID(req.params.id)}, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  });
});

// Route to get all compines
router.get('/get-all-companies', function (req, res, next){
  Company.find(function (err, users){
    if(err) return res.status(501).json({message: "Company Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Route to get all Units
router.get('/get-all-units', function (req, res, next){
  Unit.find(function (err, users){
    if(err) return res.status(501).json({message: "Company Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Route to get all Tenants
router.get('/get-all-tenants', function (req, res, next){
  Tenant.find(function (err, users){
    if(err) return res.status(501).json({message: "Company Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Route to get all Rental Agreements
router.get('/get-all-rental-agreements', function (req, res, next){
  RentalAgreement.find(function (err, users){
    if(err) return res.status(501).json({message: "Company Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Route to get all Invoices
router.get('/get-all-invoices', function (req, res, next){
  Invoice.find(function (err, users){
    if(err) return res.status(501).json({message: "Company Data Fetch Failed"});
    else return res.status(200).json(users);
  })
});

// Methods

// Method to Vilidate User
function isValidUser(req,res,next){
  if(req.isAuthenticated()) next();
  return res.status(401).json({message: "Unauthorized Request"});
}

// method to Add First Admin To DB
async function addToDB(req,res){
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    username: req.body.username,
    role: AdminRole
  });
  
  try{
    doc = await User.createUser(user);
    return res.status(201).json("User Added To DB.");
  }
  catch(err){
    return res.status(501).json(err);
  }
}

// Method to Update User
function editUser(req, res){

  var newvalues = { $set: {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    role: req.body.role
  } }; 

  User.findByIdAndUpdate({ _id: req.body.id }, newvalues, function(err, data){
    if(err) return res.status(501).json(err);
    else return res.status(201).json(data);
  })
}

// Method to add User to DB
async function addUserToDB(req,res){
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
    username: req.body.userName,
    role: req.body.role
  });
  
  try{
    doc = await User.createUser(user);
    console.log(doc);
    return res.status(201).json("User Added To DB.");
  }
  catch(err){
    return res.status(501).json(err);
  }
}

// Method to add Company to DB
async function addCompanyToDB(req,res){
  var company = new Company({
    name: req.body.name,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    pincode: req.body.pincode,
    phoneNo: req.body.phoneNo,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    panNumber: req.body.panNumber,
    accountNumber: req.body.accountNumber,
    IFSC: req.body.IFSC,
    GSTIN: req.body.GSTIN,
    bankName: req.body.bankName,
    bankBranch: req.body.bankBranch,
    notes: req.body.notes
  });
  
  try{
    doc = await Company.createCompany(company);
    console.log(doc);
    return res.status(201).json("Company Added To DB.");
  }
  catch(err){
    //console.log(err);
    return res.status(501).json(err);
  }
}

module.exports = router;
