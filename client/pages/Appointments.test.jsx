import { screen, render, act, fireEvent } from '@testing-library/react'
import AppointmentSearchPage from "./AppointmentSearchPage"
import getProviderAvailibilityMock from "../mocks/getProviderAvailibility"
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach, describe } from 'vitest'

beforeEach(async () => {
  // // fetch.resetMocks()
  // fetch.mockResponseOnce(JSON.stringify(getProvidersMock)) 
})

afterEach(() => {
  fetch.resetMocks()
})


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
      await user.selectOptions(screen.getByLabelText('Choose a Child'), ['1'])
      expect(screen.getByLabelText('Choose a Child').value).toBe('1')
      await user.selectOptions(screen.getByLabelText('Visit Type'), ['WELL'])
      expect(screen.getByLabelText('Visit Type').value).toBe('WELL')
      fireEvent.change(screen.getByLabelText('Date'), {target:{value:'2025-05-01'}})
      expect(screen.getByLabelText('Date').value).toBe('2025-05-01')

      // fireEvent.click(screen.getByText('Search'))
    })
 
    // given
      // there is a patient_id, date and appt_type
    // when
      // i submit
    // then
      // there will be a list of providers with appointment times

  } )
})
