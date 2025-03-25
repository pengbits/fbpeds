var express = require('express');
var router = express.Router();
const Patient = require('../models/Patient')

router.get('/', async (req, res, next) => {
  try {
    const rows = await Patient.read()
    res.json(rows)
  } catch (error){
    next(error)
  }
});

module.exports =  router;
