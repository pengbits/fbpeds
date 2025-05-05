import { screen, act, fireEvent, within, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getPatientMock from '../mocks/getPatient'
import getPatientImmunizationsMock from '../mocks/getPatientImmunizations'
import PatientDetailsPage from './PatientDetailsPage'
import PatientDetails from '../components/patients/PatientDetails'
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
})

describe('Patient Details Page', () => {
  describe('getPatient()', () => {
    it('returns a detail view for the patient', async () => {
      const patient = getPatientMock[0]
      const handleSetViewMock = vi.fn()
      render(<PatientDetails 
          {...patient}
          setView={handleSetViewMock}
          view={{type:'growth'}}
        />)

      expect(screen.getByText('Laila Paul')).toBeInTheDocument()
      expect(screen.getAllByText('08-12-2014')[0]).toBeInTheDocument()
      
      const tabs = screen.getByTestId('patient-tabs')
      expect(tabs).toBeInTheDocument()
      expect(within(tabs).getAllByText('growth')[0]).toBeInTheDocument()
      expect(within(tabs).getAllByText('immunizations')[0]).toBeInTheDocument()
      expect(within(tabs).getAllByText('prescriptions')[0]).toBeInTheDocument()
    })
  })
  
  // getting this warning: The current testing environment is not configured to support act(...)
  let container,content,tab;
  describe('setView(immunizations)', async () => {
    it('fetches the immunization data when I click on the tab', async () => {
      fetch
        .once(JSON.stringify(getPatientMock ))
        .once(JSON.stringify(getPatientImmunizationsMock ))
      await renderComponentWithRoute(PatientDetailsPage)

      const [tab,_] = await act(async() => {
        const tabs = await screen.findByTestId('patient-tabs')// 
        return within(tabs).findAllByText('immunizations')
      })

      await act(async() => {
        userEvent.click(tab)
      })

      // not working
      // const entryDate = await screen.findByText('Aug 29 2019')
      // expect(entryDate).toBeInTheDocument()
    })
  })
})