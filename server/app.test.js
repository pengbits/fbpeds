const request = require('supertest')
const app = require('./app')



describe('env', () => {
  it('has access to env variables', () => {
    expect(process.env.PGDATABASE).toBe('fbpeds')
  })
})