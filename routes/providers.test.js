const request = require('supertest')
const app = require('../app')

describe('providers', () => {
  describe('GET /providers', () => {
    it('returns a list of providers', async () => {
      const {body} = await request(app)
        .get('/api/providers')

      expect(body.length).toBeGreaterThan(0)
      expectAttributes(body[0], ['id','name'])
    })
  })
})