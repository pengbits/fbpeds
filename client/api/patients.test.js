import {getPatients, getPatient} from './patients'
import getPatientsMock from '../mocks/getPatients'
import getPatientMock from '../mocks/getPatient'


// TODO test the store, not the api so we can assert against state

describe('patients API', () => {
  describe('getPatients', () => {
    it('fetches a list of patients', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientsMock))
      
      const patients = await getPatients()
      expect(patients.length).toBeGreaterThan(0)
      const patient = patients[0]
      expect(Object.keys(patient)).toEqual([
        'id','name','birthdate','image'
      ])
    })
  })

  describe('getPatient', () => {
    it('fetches the details for the patient id provided', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientMock))
      
      const patients = await getPatient('1')
      expect(patients.length).toBe(1)
    })
  })
})