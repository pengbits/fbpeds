var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()

var routes = require('./routes');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const pg = require('pg')
const Pool  = pg.Pool
 
const pool = new Pool({})

app.use('/api/patients',  routes.patients)
app.use('/api/providers', routes.providers)


app.get('/api', (req,res) => {
  res.send('ahoy')
})

module.exports = app;
