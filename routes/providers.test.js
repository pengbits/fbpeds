const request = require('supertest')
const app = require('../app')

describe('providers', () => {
  describe('GET /providers', () => {
    it('returns a list a providers', async () => {
      const res = await request(app)
        .get('/api/providers')
        .set('Accept', 'application/json')
      expect(res.status).toBe(200)

      const {body} = res
      expect(body.length).toBeGreaterThan(0)
      const entry = body[0]
      const attrs = Object.keys(entry)
      expect(attrs).toEqual(expect.arrayContaining(['id','name']))
    })
  })
})