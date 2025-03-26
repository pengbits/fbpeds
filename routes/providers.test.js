const request = require('supertest')
const app = require('../app')

describe('providers', () => {
  describe('GET /providers', () => {
    it('returns a list of providers', async () => {
      const {body,status} = await request(app)
        .get('/api/providers')

      expect(status).toBe(200)
      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], ['id','name','medical_degree'])
    })
  })
  
  describe('GET /providers/1', () => {
    it('returns the provider details', async () => {
      const {body,status} = await request(app)
        .get('/api/providers/1')

      expect(status).toBe(200)
      expect(body[0].about.length).toBeGreaterThan(100)
      expect(body[0].about.length).toBeLessThan(1000)
    })
  })
})