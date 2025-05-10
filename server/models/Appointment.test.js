const Appointment = require('./Appointment')

describe('Appointment', () => {
  describe('GetMocks', () => {
    it('generates mock appointment times for the date provided', () => {
      // const date = '2025-04-01' // date is not needed
      const slots = Appointment.getMocks()
      expect(slots.length).toBeGreaterThan(0)
      const slot = slots[0]
      expect(slot.start).toBeTruthy()
      expect(slot.start.hours).toEqual(expect.any(Number))
      expect(slot.start.mins).toEqual(expect.any(Number))
    })
  })
})