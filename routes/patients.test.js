const request = require('supertest')
const app = require('../app')

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
    })
    it('returns an error for an invalid id', async () => {
      const res = await request(app)
        .get('/api/patients/9999999')

      expect(res.status).toBe(400)
    })
  })

  describe('GET /patients/:id/visits', () => {
    it('returns the patients with past visits', async () => {
      const res = await request(app)
        .get('/api/patients/1/visits');

      const patient = res.body[0]
      expect(patient.id).toBe(1)
      expect(patient.visits.length).toBeGreaterThan(0)
      const visit = patient.visits[0]
      expectAttributes(visit, [
        'visit_id',
        'visit_type',
        'visit_date',
        'provider_id'
      ])
      expect(['WELL','SICK']).toContain(visit.visit_type)
    })
  })

  describe('GET /patients/:id/visits/:visit_id', () => {
    it('returns the visit details for a well visit', async () => {
      const res = await request(app)
        .get('/api/patients/1/visits/123');

      expect(res.status).toBe(200)
      const patient = res.body[0]
      expect(patient.visits).toHaveLength(1)
      expectAttributes(patient, ['name','id','visits'])
      const visitDetails = patient.visits[0]
      expectAttributes(visitDetails, [
        'visit_type',
        'visit_date',
        'height',
        'height_percent',
        'weight',
        'weight_percent',
        'bmi_percent'
        //... and all above attributes
      ])
    })
  })

  describe('GET /patients/:id/visits/:visit_id', () => {
    it('returns the visit details for a sick visit', async () => {
      const res = await request(app)
        .get('/api/patients/1/visits/124');

      expect(res.status).toBe(200)
    })
  })

  describe('GET /patients/:id/prescriptions', () => {
    it('returns the patient with prescriptions', async () => {
      const res = await request(app)
        .get('/api/patients/1/prescriptions')
  
      const patient = res.body[0]
      expect(patient.prescriptions.length).toBeGreaterThan(0)
      const script = patient.prescriptions[0]
      expectAttributes(script, [
        'date',
        'prescription_name',
        'pharmacy',
        'directions'
      ])
    })
  })

  describe('GET /patients/:id/immunizations', () => {
    it('returns the patient with immunizations', async () => {
      const res = await request(app)
        .get('/api/patients/1/immunizations')
  
      const patient = res.body[0]
      expect(patient.immunizations.length).toBeGreaterThan(0)
      const immunization = patient.immunizations[0]
      expectAttributes(immunization, [
        'type',
        'date'
      ])
    })
  })

  describe('GET /patients/:id/growth', () => {
    it('returns the patient with weight/height records', async () => {
      const res = await request(app)
        .get('/api/patients/1/growth')
  
      const patient = res.body[0]
      // console.log(res.body)
      expect(patient.growth.length).toBeGreaterThan(0)
      expectAttributes(patient.growth[0], [
        'growth_id',      //  11,
        'date',           //  2024-11-18T05:00:00.000Z',
        'age_years',      //  10,
        'height',         //  57.9,
        'weight',         //  
        'height_percent', //  85,
        'weight_percent', //  
        'bmi_percent'     //
      ])
    })
  })
})