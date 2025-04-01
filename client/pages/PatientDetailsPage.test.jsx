import { screen, act } from '@testing-library/react'
import getPatientMock from '../mocks/getPatient'
import PatientDetailsPage from './PatientDetailsPage'
import { renderComponentWithRoute } from '../test/routerUtils'


beforeEach(async () => {
  // fetch.resetMocks()
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module,
      useParams:() => {
        return {id:'1'}
      }
    }
  })
  fetch.mockResponseOnce(JSON.stringify(getPatientMock))
  await renderComponentWithRoute(PatientDetailsPage)
})

describe('Patients Page', () => {
  describe('getPatient()', () => {
    it('returns a detail view for the patient', () => {
      expect(screen.getAllByText('Laila Paul')).toHaveLength(1)
      // TODO expect(screen.getByText('08-12-2014')).toBeInDocument()
    })
  })
})