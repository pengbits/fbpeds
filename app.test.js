const request = require('supertest')
const app = require('./app')

describe('patients', () => {
  describe('GET /patients', () => {
    it('returns a list a patients', async () => {
      const {body} = await request(app)
        .get('/api/patients')
        .set('Accept', 'application/json')

      expect(body.length).toBeGreaterThan(0)
      const entry = body[0]
      const attrs = Object.keys(entry)
      expect(attrs).toEqual(expect.arrayContaining(['id','name','birthdate']))
    })
  })
})