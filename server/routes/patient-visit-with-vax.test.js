const request = require('supertest')
const app = require('../app')


describe('patient visit with vax', () => {
  let res
  let visit
  let vax
  let details
  beforeAll(() => {
    res = null
  })
  it('given there is a vaccination', async () => {
    res = await request(app)
      .get('/api/patients/1/immunizations')

    expect(res.body[0].immunizations.length).toBeGreaterThan(0)
    vax = res.body[0].immunizations.find(v => v.immunization_id == 7)

  })
  it('and there was a visit on the same date', async () => {
    res = await request(app)
      .get('/api/patients/1/visits')

    visit = res.body[0].visits.find(v => {
      // console.log(v.visit_date, vax.date, '?', (v.visit_date === vax.date))
      return v.visit_date === vax.date
    })
    console.log(visit)
    expect(visit).toBeTruthy()
  })

  it('then when I get the visit details for the visit', async () => {
    res = await request(app)
      .get(`/api/patients/1/visits/${visit.visit_id}`)

    details = res.body[0].visits[0]
  })
  
  it('it will contain the vaccination info', () => {
    expect(details.id).toBe(visit.visit_id)
    expect(details.vaccines).toEqual(expect.arrayContaining([
      expect.objectContaining({
        type: vax.type
      })
    ]))
  })
})