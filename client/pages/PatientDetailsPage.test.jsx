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
  
  // getting this warning: The current testing environment is not configured to support act(...)
  let container,content,tab;
  describe('setView(immunizations)', async () => {
    it('fetches the immunization data when I click on the tab', async () => {
      fetch.mockResponseOnce(JSON.stringify(getPatientImmunizationsMock))
      
      await act(async() => {
        tab = await screen.findByText('immunizations')
        expect(tab).toBeInTheDocument()
        await userEvent.click(tab) 
        content = await screen.findByTestId('tabs-content')
      })
      // {
      //   immunization_id: 36,
      //   date: '2019-10-10T04:00:00.000Z',
      //   type: 'FLU-IIV4 6m+ pf'
      // },
      const entry = await within(content).findByText('Oct 10:FLU-IIV4 6m+ pf')
      expect(entry).toBeInTheDocument()
    })
  })
})