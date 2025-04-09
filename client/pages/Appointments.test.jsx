import { screen, render, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentSearchPage from "./AppointmentSearchPage"
import AppointmentSearchResults from '../components/appointments/AppointmentSearchResults'
import getProviderAvailibilityMock from "../mocks/getProviderAvailibility"
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach, describe } from 'vitest'
import { useNavigate } from 'react-router'

beforeEach(async () => {
  // // fetch.resetMocks()
  // fetch.mockResponseOnce(JSON.stringify(getProvidersMock)) 
})

afterEach(() => {
  fetch.resetMocks()
  vi.restoreAllMocks()
})

const populateForm  = async (user, attrs) => {
  await user.selectOptions(screen.getByLabelText('Choose a Child'), [`${attrs.patient_id}`])
  await user.selectOptions(screen.getByLabelText('Visit Type'), [attrs.visit_type])
  fireEvent.change(screen.getByLabelText('Date'), {target:{value:attrs.date}})
}

describe('Appointments', () => {
  describe('new appointment', () => {
    it('renders a form', async () => {
      await renderComponentWithRoute(AppointmentSearchPage)
      expect(screen.getByLabelText('Choose a Child')).toBeInTheDocument()
      expect(screen.getByLabelText('Visit Type')).toBeInTheDocument()
      expect(screen.getByLabelText('Date')).toBeInTheDocument()
    })

    it('should accept input', async ()=>{
      const {user} = await renderComponentWithRoute(AppointmentSearchPage, {withUser:true})
      await populateForm(user, {patient_id:1, visit_type:'WELL', date:'2025-05-01'})
      expect(screen.getByLabelText('Choose a Child').value).toBe('1')
      expect(screen.getByLabelText('Visit Type').value).toBe('WELL')
      expect(screen.getByLabelText('Date').value).toBe('2025-05-01')
      
      // fireEvent.click(screen.getByText('Search'))
    })
 
    // given  there is a patient_id, date and appt_type
    // when   I click on the search button
    // then   there will be a list of providers with appointment times
    it('should fetch a list of providers with appointment times', async () => {
      fetch.mockResponseOnce(JSON.stringify(getProviderAvailibilityMock)) 

      const {user} = await renderComponentWithRoute(AppointmentSearchPage, {withUser:true})
      await populateForm(user, {patient_id:1, visit_type:'SICK', date:'2025-05-01'})
      await act(() => fireEvent.click(screen.getByText('Search')))
      
      // check header
      expect(await screen.findByText('Sick Visits in Brooklyn after May 1 with any Provider')).toBeInTheDocument()
      // for each provider ...
      expect(screen.getByTestId('appointment-providers')).toBeInTheDocument()
      // check availability ...
      expect(await screen.findAllByTestId('provider-entry')).toHaveLength(getProviderAvailibilityMock.length)
      const availability  = await screen.findAllByTestId('provider-availability')
      expect(availability.length).toBe(getProviderAvailibilityMock.length)
      // generate expected slot times ...
      const slotTimes = getProviderAvailibilityMock[0].availability[0].slots.map(({start}) => {
        return start.hours + ':' + (`${start.mins}`.length == 1 ? `${start.mins}0` : start.mins)
      })
      // pick one at random ...
      const s = Math.floor(Math.random() * slotTimes.length)
      const slotText = slotTimes[s]
      // check present in document
      const slotElements = await screen.findAllByText(slotText)
      expect(slotElements.length).toBeGreaterThan(0)
    })
  })

  // given  there is a patient_id, date and appt_type and a list of available times
  // when   I click on a time slot
  // then   it will send the appointment attrs to the server
  // when   it loads
  // then   there will be a new appointment associated with the patient
  it('should create a new appointment for the time selected', async () => {
    // const await render()
    const user = userEvent.setup()
   
    render(<AppointmentSearchResults 
        visit_type={'SICK'}
        date={'2025-05-01'}
        patient_id={'1'}
        providers={getProviderAvailibilityMock}
    />)

    const slotElements = screen.findByRole('link')
    const s = Math.floor(Math.random() * slotElements.length)
    user.click(slotElements[s])

  })
})
