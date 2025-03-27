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
    const rows = await Patient.find(Number(id), opts)
    res.json(rows)
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

router.get('/:id/visits/:visitId', async (req, res) => {
  const {id,visitId} = req.params
  const rows = await Patient.findVisit(Number(id), Number(visitId))
  res.json(rows)
})

router.get('/:id/prescriptions', (req, res) => {
  return getPatient(req, res, {include:'prescriptions'})
})

router.get('/:id/immunizations', (req, res) => {
  return getPatient(req, res, {include:'immunizations'})
})

router.get('/:id/growth', (req, res) => {
  return getPatient(req, res, {include:'growth'})
})

module.exports =  router;
