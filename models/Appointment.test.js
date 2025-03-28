const Appointment = require('./Appointment')

describe('Appointment', () => {
  describe('GetMocks', () => {
    it('generates mock appointment times for the date provided', () => {
      // const date = '2025-04-01' // not needed
      const slots = Appointment.getMocks()
      console.log(slots)
      // console.log(slots.map(({start,end}) => {
      //   return (`${start.hour}:${start.minutes} - ${end.hour}:${end.minutes}`)
      // }))
    })
  })
})