const request = require('supertest')
const app = require('../app')
const { providers } = require('.')

describe('patients', () => {
  describe('GET /patients', () => {
    it('returns a list of patients', async () => {
      const {body} = await request(app)
        .get('/api/patients')

      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], ['id','name','birthdate'])
    })
  })

  describe('GET /patients/:id', () => {
    it('returns the patient for the id', async () => {
      const res = await request(app)
        .get('/api/patients/1');

      const patient = res.body[0]
      expect(patient.id).toBe(1)
      expect(patient.name).toEqual(expect.any(String))
    })
  })

  describe('GET /patients/:id/visits', () => {
    it('returns the patients\'s past visits', async () => {
      const res = await request(app)
        .get('/api/patients/1/visits');

      const patient = res.body[0]
      expect(patient.visits.length).toBeGreaterThan(0)
      const visit = patient.visits[0]
      expectAttributes(visit, [
        'visit_id',   //  1,
        'visit_date', // '2024-11-18T05:00:00.000Z',
        'age_years',  //  10,
        'height',     //  57.9,
        'weight',     //  82.2,
        'patient_id', //  1
      ])
    })
  })
})