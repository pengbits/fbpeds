var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{
    id:1, 
    name: 'Laila Paul',
    birthdate: '08-12-14'
  }])
});

module.exports =  router;
