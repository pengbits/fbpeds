var express = require('express');
var router = express.Router();
const Appointment = require('../models/Appointment')

router.get('/', async (req, res, next) => {
  try {
    const rows = await Appointment.read()
    res.json(rows)
  } catch (error){
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [appointment] = await Appointment.create(req.body)
    res.status(201)
    res.json({
      success: true,
      appointment
    })
  } catch (error){
    next(error)
  }
})

router.delete(`/:id`, async (req, res, next) => {
  try {
    const {id} = req.params
    const {success} = await Appointment.delete(id)
    res.status(204).send()
  } catch(error){
    console.log(error)
    next(error)
  }
})
module.exports = router