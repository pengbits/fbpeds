var express = require('express');
var router = express.Router();
const Patient = require('../models/Patient')

router.get('/', async (req, res) => {
  try {
    const rows = await Patient.read()
    res.json(rows)
  } catch (error){
    res.json(error)
  }
});


router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const row = await Patient.find(Number(id))
    res.json(row)
  } catch (error){
    res.json(error)
  }
})

router.get('/:id/visits', async (req, res) => {
  try {
    const {id} = req.params
    const row = await Patient.find(Number(id), {include:'visits'})
    res.json(row)
  } catch (error){
    res.json(error)
  }
})

module.exports =  router;
