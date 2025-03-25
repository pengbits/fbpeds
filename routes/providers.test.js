const request = require('supertest')
const app = require('../app')

describe('providers', () => {
  describe('GET /providers', () => {
    it('returns a list of providers', async () => {
      const res = await request(app)
        .get('/api/providers')
        .set('Accept', 'application/json')
      expect(res.status).toBe(200)

      const {body} = res
      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], ['id','name'])
    })
  })
})