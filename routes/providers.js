var express = require('express');
var router = express.Router();
const Provider = require('../models/Provider')

router.get('/', async (req, res, next) => {
  try {
    const rows = await Provider.read()
    res.json(rows)
  } catch (error){
    next(error)
  }
});

module.exports =  router;
