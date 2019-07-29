var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors = require('cors');
var mongoose = require('mongoose');

var app = express();

app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials: true
}));

// Connecting to mongo db
mongoose.connect('mongodb://localhost/erp');

var passport = require('passport');
var session = require('express-session');

app.use(session({
    name:'erp.sid',
    resave:false,
    saveUninitialized:false,
    secret: 'secret',
    cookie:{
        maxAge: 36000000,
        httpOnly: false,
        secure: false
    }
}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
