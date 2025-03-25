var express = require('express');
var router = express.Router();

// async (req,res) => {
//   const result = await pool.query('SELECT * FROM patients')
//   res.json(result.rows)
// })

router.get('/', function(req, res, next) {
  res.json([{
    id:1, 
    name: 'Laila Paul',
    birthdate: '08-12-14'
  }])
});

module.exports =  router;
