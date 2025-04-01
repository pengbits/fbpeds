import { describe, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { beforeEach } from 'vitest'
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

beforeEach(() => {
})

describe('Appointments', () => {
  describe('New Appointment for Patient', () => {
    it.todo('displays a form for creating the appointment', () => {
      expect(screen.getByText('New Appointment')).toBeInTheDocument()
    })
  })
})