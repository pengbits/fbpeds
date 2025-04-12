import { screen, render, act } from '@testing-library/react'
import getPatientsMock from '../mocks/getPatients'
import PatientsPage from './PatientsPage'
import { renderComponentWithRoute } from '../test/routerUtils'

beforeEach(async () => {
  // fetch.resetMocks()
  fetch.mockResponseOnce(JSON.stringify(getPatientsMock))
  await renderComponentWithRoute(PatientsPage)
      
})


describe('Patients Page', () => {
  describe('getPatients()', () => {
    it('displays a list of patients', () => {
     expect(screen.getByText('Patients')).toBeInTheDocument()
    })

    it('has a name and image for each patient', async () => {
      expect(screen.getAllByTestId('patient-name')).toHaveLength(3)
      expect(screen.getAllByAltText('image of patient')).toHaveLength(3)
    })
    
    it('has a call to action to schedule an appointment', () => {
      expect(screen.getByText('Book Your Next Appointment')).toBeInTheDocument()
    })
  })
})



