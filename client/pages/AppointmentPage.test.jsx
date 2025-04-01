import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import AppointmentPage from "./AppointmentPage"
import { expect } from 'vitest'

beforeEach(() => {

})

const setup = (component) => {
  const user = userEvent.setup()
  render(component)
  return {
    user
  }
}

describe('Appointments', () => {
  describe('New Appointment', () => {
    it('displays a form for creating the appointment', () => {
      render(<AppointmentPage />)
      // screen.debug()
      expect(screen.getByText('New Appointment')).toBeInTheDocument()
      expect(screen.getByLabelText('Choose a Child')).toBeInTheDocument()
      expect(screen.getByLabelText('Visit Type')).toBeInTheDocument()
      expect(screen.getByLabelText('Date')).toBeInTheDocument()
      expect(screen.getByText('Search')).toBeInTheDocument()
  
    })
    // given there is a date
    // when i submit
    // there will be a list of providers with availabilities
    it('on submit, fetch the provider availability', async () => {
      const {user} = setup(<AppointmentPage />)
      await user.click(screen.getByText('Search'))
      expect(screen.getAllByTestId('provider'))
    })
  })
})