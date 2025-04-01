import { screen, render } from '@testing-library/react'
import getPatientsMock from '../mocks/getPatients'
import PatientsPage from './PatientsPage'
import { renderComponentWithRoute } from '../test/routerUtils'

beforeEach(() => {
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module, 
      useLoaderData: vi.fn(() => getPatientsMock)
    }
  })
 renderComponentWithRoute(PatientsPage)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Patients Page', () => {
  describe('getPatients()', () => {
    it('displays a list of patients', () => {
      expect(screen.getByText('Patients')).toBeInTheDocument()
    })

    it('has a name and image for each patient', () => {
      expect(screen.queryAllByTestId('patient-name')).toHaveLength(3)
      expect(screen.queryAllByAltText('image of patient')).toHaveLength(3)
    })
  
    it('has a call to action to schedule an appointment', () => {
      expect(screen.getByText('Book Your Next Appointment')).toBeInTheDocument()
    })
  })
})