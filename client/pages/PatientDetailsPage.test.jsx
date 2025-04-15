import { screen, act, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getPatientMock from '../mocks/getPatient'
import getPatientImmunizationsMock from '../mocks/getPatientImmunizations'
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

  let container,content
  describe('setView(immunizations)', async () => {
    it('when I click on the immunizations tab', async () => {
      await act(async () => {
        await userEvent.click(screen.getByText('immunizations'))
      })
    })
    it('then the tabs will show a loading state', () => {
      container = screen.getByTestId('tabs-content')
      expect(container).toBeInTheDocument()
      content = within(container).getByText('loading...')
      expect(content).toBeInTheDocument()  
    })
    it('and it will fetch the data for the tab content', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientImmunizationsMock)) 
      
      await act(async () => {

      })
    })
  })
})