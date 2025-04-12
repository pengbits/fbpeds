import {getPatients, getPatient} from './patients'
import getPatientsMock from '../mocks/getPatients'
import getPatientMock from '../mocks/getPatient'
import { afterEach } from 'vitest'



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
    it('fetches the patient details', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientMock))
      
      const patients = await getPatient('1')
      expect(patients.length).toBe(1)
      const patient = patients[0]
      console.log(patient)
    })
  })
})