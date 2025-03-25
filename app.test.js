const request = require('supertest')
const app = require('./app')

describe('patients', () => {
  describe('GET /patients', () => {
    it('returns a list a patients', () => {
      return request(app).get('/api/patients')
              .expect('Content-Type', /json/)
    })
  })
})