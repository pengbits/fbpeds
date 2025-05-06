import { screen, render, act, fireEvent } from '@testing-library/react'
import AppointmentSearchPage from "./AppointmentSearchPage"
import getProviderAvailibilityMock from "../mocks/getProviderAvailibility"
import { renderComponentWithRoute } from '../test/routerUtils'
import { dateForAppointment } from '../util/date'
beforeEach(async () => {
  fetch.resetMocks()
  // mock problematic radix select component, by downgrading to vanilla html equivalent
  vi.mock('@/components/forms/select', () => ({
    default: (({
      options, 
      initialAttrs, 
      name, 
      placeholder,
      onValueChange
    }) => {

      return (<>
        <label htmlFor={name}>{placeholder}</label><br />
        <select id={name} name={name} onChange={onValueChange}>
          {options.map(({value,label}) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </>)
    })
  }))

  // mock react-day-picker to downgrade to simple html5 input
  vi.mock('@/components/forms/DatePicker', () => ({  
    default: ({
      date,onSelect
    }) => {
      return (<input type="date" id="date" 
        onChange={e => onSelect(e.target.value)}  
        value={date || ''} />
      )
    }
  }))
})

afterEach(() => {
  // fetch.resetMocks()
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
      expect(screen.getByLabelText('Choose a Child:')).toBeInTheDocument()
      expect(screen.getByLabelText('Visit Type')).toBeInTheDocument()
      expect(screen.getByLabelText('Date')).toBeInTheDocument()
    })

    it('should accept input', async ()=>{
      const {user} = await renderComponentWithRoute(AppointmentSearchPage, {withUser:true})
      await populateForm(user, {patient_id:1, visit_type:'WELL', date:'2025-05-01'})
      expect(screen.getByLabelText('Choose a Child').value).toBe('1')
      expect(screen.getByLabelText('Visit Type').value).toBe('WELL')
      expect(screen.getByLabelText('Date').value).toBe('2025-05-01')
    })
 
    // given  there is a patient_id, date and appt_type
    // when   I click on the search button
    // then   there will be a list of providers with appointment times
    it('should fetch a list of providers with appointment times', async () => {
      fetch.mockResponseOnce(JSON.stringify(getProviderAvailibilityMock)) 

      const {user} = await renderComponentWithRoute(AppointmentSearchPage, {withUser:true})
      const d = new Date(); d.setDate(d.getDate()+1)
      const date = dateForAppointment(d)
      await populateForm(user, {patient_id:1, visit_type:'SICK', date})
      await act(() => fireEvent.click(screen.getByText('Search for Times')))
      
      // check header
      // NOT WORKING expect(await screen.findByText('Sick Visits in Brooklyn after May 1 2025 with any Provider')).toBeInTheDocument()
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
})
