import { describe, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import getPatientsMock from '../mocks/getPatients'
import PatientsPage from './PatientsPage'
import { beforeEach } from 'vitest'
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

beforeEach(() => {
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module,
      useLoaderData: vi.fn(() => {
        // console.log('userLoaderMock')
        return getPatientsMock
      })
    }
  })
  const router = createMemoryRouter(
    createRoutesFromElements(
    <Route path="/" Component={PatientsPage} />)
  )
  render(<RouterProvider router={router}>
    <PatientsPage />
  </RouterProvider>)
})

describe('Patients Page', () => {
  describe('getPatients()', () => {
    it('displays a list of patients', () => {
      expect(screen.getByText('Patients')).toBeInTheDocument()
    })

    it('has a name and image for each patient', () => {
      expect(screen.queryAllByTestId('patient-name')).toHaveLength(3)
      expect(screen.queryAllByAltText('image of patient')).toHaveLength(3)
    })
    it('has a call to action to schedule an appointment', () => {
      expect(screen.getByText('Book Your Next Appointment')).toBeInTheDocument()
    })
  })
})