import {getPatients, getPatient} from './patients'
import getPatientsMock from '../mocks/getPatients'
import getPatientMock from '../mocks/getPatient'


describe('patients API', () => {
  describe('getPatients', () => {
    it('fetches a list of patients', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientsMock))
      
      const patients = await getPatients()
      expect(patients.length).toBeGreaterThan(0)
      const patient = patients[0]
      expectAttributes(patient, [
        'id','name','birthdate','image','appointments'
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