var express = require('express');
var router = express.Router();
const Patient = require('../models/Patient')

router.get('/', async (req, res) => {
  try {
    const rows = await Patient.read()
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
    const row = await Patient.find(Number(id))
    res.json(row)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
})

router.get('/:id/visits', async (req, res) => {
  try {
    const {id} = req.params
    const row = await Patient.find(Number(id), {include:'visits'})
    res.json(row)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
})

router.get('/:id/prescriptions', async (req, res) => {
  try {
    const {id} = req.params
    const row = await Patient.find(Number(id), {include:'prescriptions'})
    res.json(row)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
})

module.exports =  router;
