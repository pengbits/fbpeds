import { screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getPatientMock from '../mocks/getPatient'
import PatientDetailsPage from './PatientDetailsPage'
import { renderComponentWithRoute } from '../test/routerUtils'


beforeEach(async () => {
  fetch.resetMocks()
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
    it('returns a detail view for the patient', async () => {
      expect(screen.getByText('Laila Paul')).toBeInTheDocument()
      expect(screen.getByText('08-12-2014')).toBeInTheDocument()
      expect(screen.getByText('growth')).toBeInTheDocument()
      expect(screen.getByText('immunizations')).toBeInTheDocument()
      expect(screen.getByText('prescriptions')).toBeInTheDocument()
    })
  })

  describe('setView(immunizations)', () => {
    it('updates the tabs to display immunizations data when clicked', async () => {
      await act(async () => {
        userEvent.click(screen.getByText('immunizations'))
      })
      const container = screen.getByTestId('tabs-content-growth')
      expect(container).toBeInTheDocument()
      const content = within(container).getByText('loading')
      expect(content).toBeInTheDocument()
    })
  })
})