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

const getPatient = async (req, res, opts={}) => {
  try {
    const {id} = req.params
    const row = await Patient.find(Number(id), opts)
    res.json(row)
  } catch (e){
    res.status(400).json({
      error: e.message
    })
  }
}
router.get('/:id',  (req, res) => {
  return getPatient(req, res)
})

router.get('/:id/visits', (req, res) => {
  return getPatient(req, res, {include:'visits'})
})

router.get('/:id/prescriptions', (req, res) => {
  return getPatient(req, res, {include:'prescriptions'})
})

module.exports =  router;
