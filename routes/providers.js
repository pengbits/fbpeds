var express = require('express');
var router = express.Router();
const Provider = require('../models/Provider')

router.get('/', async (req, res) => {
  try {
    const rows = await Provider.read()
    res.json(rows)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
});


router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const rows = await Provider.find(Number(id))
    res.json(rows)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
})

module.exports =  router;
