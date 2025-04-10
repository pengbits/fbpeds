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

  describe('POST /appointments', () => {
    it('saves a new appointment to the db', async () => {
      const res = await request(app)
        .post('/api/appointments')
        .set('Accept', 'application/json')
        .send({
          provider_id: 1,
          patient_id: 1,
          datetime: '04-04-2025T10:00'
        })
        expect(res.status).toBe(201)
        const {body} = res;
        expect(body.appointment).toEqual(expect.objectContaining({
          appointment_id: expect.any(Number),
          datetime: expect.any(String),
          provider_id: expect.any(Number),
          patient_id: expect.any(Number),
        }))
    })
  })
})