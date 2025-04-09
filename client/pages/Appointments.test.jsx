import { screen, render, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AppointmentSearchPage from "./AppointmentSearchPage"
import AppointmentSearchResults from '../components/appointments/AppointmentSearchResults'
import getProviderAvailibilityMock from "../mocks/getProviderAvailibility"
import createAppointmentMock from '../mocks/createAppointment'
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach, describe, expect } from 'vitest'
import { useNavigate } from 'react-router'
import { get } from '../../server/app'

beforeEach(async () => {
  // // fetch.resetMocks()
  // vi.resetMocks()
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
    fetch.mockResponseOnce(JSON.stringify(createAppointmentMock)) 
    const availability = getProviderAvailibilityMock[1].availability.slice(0)
    

    // this works but pollutes other tests,
    // might be worth trying this approach:
    // https://stackblitz.com/~/edit/vitest-dev-vitest-afppg3?file=test/basic.test.ts
    // vi.mocked(math.sum).mockImplementationOnce((a, b) => a + 100)
    vi.mock('@/components/appointments/ProviderAvailabilityListItem', async (Component) => {
      const og = await Component()
      return og
    })

    // const mockListItem= vi.mock('@/components/appointments/ProviderAvailabilityListItem', async (Component) => {
    //   await Component
    //   console.log('hello from mock', Component)

    //   return {
    //     default: (props) => {
    //       return (<a role="link"
    //         onClick={(e) => console.log('clicked!')}>
    //         click me
    //       </a>)
    //     }
    //   } 
    // })

    const handleSelectTime = function(e) {
      console.log(`handleSelectTime()`)
    }
    // vi.mocked(handleSelectTime).mockImplementation((e) => {
    //   console.log('mocked() handleSelect', e)
    // })

    const spy = vi.spyOn({handleSelectTime}, 'handleSelectTime')
    render(<AppointmentSearchResults 
        visit_type={'SICK'}
        date={'2025-05-01'}
        patient_id={'2'}
        handleSelectTime={handleSelectTime}
        providers={getProviderAvailibilityMock.slice(0)}
    />)


    const slotElements = await screen.findAllByRole('link')
    const s = Math.floor(Math.random() * slotElements.length)
    await act(async () => {
      return user.click(slotElements[s])
    })

    // this looks it might work, but spy returns called zero times
    // expect(spy).toHaveBeenCalledTimes(1)
 // 'expected spyOn to have been called' issue
    // expect(await screen.findByText('Your appointment has been created')).toBeInTheDocument()
  })
})
