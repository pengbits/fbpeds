import { render, screen, act } from '@testing-library/react'

beforeEach(() => {
})

describe('Appointments', () => {
  describe('New Appointment for Patient', () => {
    it('displays a form for creating the appointment', () => {
      expect(screen.getByText('New Appointment')).toBeInTheDocument()
      expect(screen.getByLabelText('Choose a Child').toBeInTheDocument())
      expect(screen.getByLabelText('Visit Type').toBeInTheDocument())
      expect(screen.getByLabelText('Date').toBeInTheDocument())
      expect(screen.getByText('Search').toBeInTheDocument())
  
    })
  })
})