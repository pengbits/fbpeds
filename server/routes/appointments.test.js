const request = require('supertest')
const app = require('../app')
const { patients } = require('.')

describe('appointments', () => {
  describe('GET /appointments', () => {
    it('returns a list of appointments', async () => {
      const {body} = await request(app)
        .get('/api/appointments')

      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], [
        'appointment_id',
        'datetime',
        'provider_id',
        'patient_id'
      ])
    })
  })
  
  describe('GET /appointments/:id', () => {
    it('returns the details for the appointment', async () => {
      const {body} = await request(app)
        .get('/api/appointments/451')

      expect(body.length).toBe(1)
      expectAttributes(body[0], [
        'appointment_id',
        'datetime',
        'provider_id',
        'patient_id'
      ])
    })
  })

  describe('POST /appointments', () => {
    it('saves a new appointment to the db', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .set('Accept', 'application/json')
        .send({
          datetime: '04-04-2025T10:00',
          visit_type: 'WELL',
          provider_id: 1,
          patient_id: 1,
        })
        expect(res.status).toBe(201)
        const {body} = res;
        expect(body.appointment).toEqual(expect.objectContaining({
          appointment_id: expect.any(Number),
          datetime: expect.any(String),
          provider_id: expect.any(Number),
          patient_id: expect.any(Number),
          visit_type: 'WELL'
        }))
    })
  })
  
  describe('PUT /appointments/id', () => {
    it('updates the appointment with new attributes', async() => {
      const {body} = await request(app)
        .get('/api/appointments')
      const {length} = body;
      const r = Math.floor(Math.random() * length)
      const appt = body[r]
      
      const res = await request(app)
        .put(`/api/appointments/${appt.appointment_id}`)
        .set('Accept', 'application/json')
        .send({
          datetime: '06-01-2025T12:00',
          provider_id: 1,
          patient_id: 1,
        })
      expect(res.status).toBe(200)
      expect(res.body.appointment.datetime).toBe("2025-06-01T16:00:00.000Z")

    })
  })

  describe('DELETE /appointments/id', () => {
    it('removes the appointment from the db', async () => {
      const {body} = await request(app)
        .get('/api/appointments')

      const last = body[body.length-1]

      const res = await request(app)
        .delete(`/api/appointments/${last.appointment_id}`)
      expect(res.status).toBe(204)
    })
  })
})