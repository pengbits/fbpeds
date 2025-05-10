const request = require('supertest')
const app = require('../app')

// this is a test that hits mutliple endpoints, we want to assert
// that a newly created appointment shows up in the patient index
describe('patient with appointment', () => {
  let attrs
  let res
  beforeAll(() => {
    attrs = {}
    res = null
  })
  it('given there is a patient_id, provider_id, visit_type and datetime', () => {
    attrs.patient_id = 2
    attrs.provider_id = 3
    attrs.visit_type= 'SICK'
    attrs.datetime = '2025-05-01T09:00'
  })
  it('when i post the attributes to /appointments', async () => {
    res = await request(app).
      post('/api/appointments')
        .set('Accept', 'application/json')
        .send(attrs)

      expect(res.status).toBe(201)
      const {body} = res;
      expect(body).toEqual({
        success: true,
        appointment: {
          appointment_id: expect.any(Number),
          datetime: expect.any(String),
          patient_id: 2,
          provider_id: 3,
          visit_type:'SICK'
        }
      })
  })
  it('then /patients will include the appointment in the response', async () => {
    res = await request(app)
      .get('/api/patients')

    expect(res.status).toBe(200)
    expect(res.body.length).toBeGreaterThan(0)
    const patientResponse = res.body.find(p => p.id == 2)
    expect(patientResponse.appointments.length).toBeGreaterThan(0)
  })
})