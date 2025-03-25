const request = require('supertest')
const app = require('../app')

describe('patients', () => {
  describe('GET /patients', () => {
    it('returns a list of patients', async () => {
      const {body} = await request(app)
        .get('/api/patients')
        .set('Accept', 'application/json')

      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], ['id','name','birthdate'])
    })
  })
})