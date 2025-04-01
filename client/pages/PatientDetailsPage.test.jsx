import { screen } from '@testing-library/react'
import getPatientMock from '../mocks/getPatient'
import PatientDetailsPage from './PatientDetailsPage'
import { renderComponentWithRoute } from '../test/routerUtils'

beforeEach(() => {
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module, 
      useLoaderData: vi.fn(() => getPatientMock)
    }
  })
 renderComponentWithRoute(PatientDetailsPage)
})

describe('Patients Page', () => {
  describe('getPatient()', () => {
    it('returns a detail view for the patient', () => {
      expect(screen.getByText('Laila Paul')).toBeInTheDocument()
    })

  })
})