import { screen, render, act, within } from '@testing-library/react'
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
 
    it('lists upcoming appointments for each patient', () => {
      const appt_headline_regex = /(Well|Sick) visit on \D{3} \d{2} at \d{1,2}:\d{2} with Dr\. [A-Za-z]+\s[A-Za-z]+/
      expect(screen.getAllByText(appt_headline_regex).length).toBeGreaterThan(0)
    })
 
    it('has cancel and reschedule options for the appointment', async () => {
      const appointmentItems = screen.getAllByTestId('appointment-list-item')
      expect(await within(appointmentItems[0]).findByText('cancel')).toBeInTheDocument()
      expect(await within(appointmentItems[0]).findByText('reschedule')).toBeInTheDocument()
    })
  })
})



