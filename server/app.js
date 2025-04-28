var createError = require('http-errors');
var express = require('express');
var ViteExpress = require("vite-express");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var cors = require('cors')
var logger = require('morgan');
var session = require('express-session')
// var csrf = require('csurf');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;
var passport = require('passport');
require('dotenv').config()

var routes = require('./routes');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

app.use(passport.authenticate('session'));
app.use(function(req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !! msgs.length;
  req.session.messages = [];
  next();
});

app.use('/', routes.index)
app.use('/', routes.auth)
app.use('/api/appointments',  routes.appointments)
app.use('/api/patients',      routes.patients)
app.use('/api/providers',     routes.providers)

app.get('/api', (req,res) => {
  res.json({greeting:'ahoy'})
})


// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


app.ViteExpress = ViteExpress
module.exports = app;
