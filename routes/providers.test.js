const request = require('supertest')
const app = require('../app')

describe('providers', () => {
  describe('GET /providers', () => {
    it('returns a list of providers', async () => {
      const {body,status} = await request(app)
        .get('/api/providers')

      expect(status).toBe(200)
      expect(body.length).toBeGreaterThan(0)
      const provider = body[0]
      expect(provider).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        medical_degree: expect.any(String)
      }))
      expect(provider.about).not.toBeTruthy() // abbreviared form
    })
  })
  
  describe('GET /providers/1', () => {
    it('returns the provider details', async () => {
      const {body,status} = await request(app)
        .get('/api/providers/1')

      expect(status).toBe(200)
      const provider = body[0];
      expectAttributes(provider, ['id','name','medical_degree','about','image'])
      expect(provider.about.length).toBeGreaterThan(100)
      expect(provider.about.length).toBeLessThan(1000)
    })
  })

  describe('GET /providers/availability', () => {
    it('returns providers and their availability for a date', async () => {
      const {status,body} = await request(app)
        .get('/api/providers/availability/2025-04-01')
    
      expect(status).toBe(200)
      expect(body.length).toBeGreaterThan(0)
      const provider = body[0]
      // TODO should not be scoped to only 1 day,
      // a more realistic model would be an array of dates with slots for each date
      const day = provider.availability[0]
      expect(day.date).toBe('2025-04-01')
      expect(day.slots).toEqual(expect.arrayContaining([{
        start: expect.objectContaining({
          hours: expect.any(Number), 
          mins: expect.any(Number)
        }),
        end: expect.objectContaining({
          hours: expect.any(Number), 
          mins: expect.any(Number)
        })
      }]))

    })
  })
})