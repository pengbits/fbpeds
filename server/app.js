var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var cors = require('cors')
var logger = require('morgan');
require('dotenv').config()

var routes = require('./routes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..','public')));


app.use('/api/appointments',  routes.appointments)
app.use('/api/patients',      routes.patients)
app.use('/api/providers',     routes.providers)

app.get('/api', (req,res) => {
  res.send('ahoy')
})

module.exports = app;
