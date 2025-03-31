import { describe, expect } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import getPatientMock from '../mocks/getPatient'
import PatientDetailsPage from './PatientDetailsPage'
import { beforeEach } from 'vitest'
import { createMemoryRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'

beforeEach(() => {
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module,
      useLoaderData: vi.fn(() => {
        // console.log('useLoaderData Mock')
        return getPatientMock
      })
    }
  })
  const router = createMemoryRouter(
    createRoutesFromElements(
    <Route path="/" Component={PatientDetailsPage} />)
  )
  render(<RouterProvider router={router}>
    <PatientDetailsPage />
  </RouterProvider>)
})

describe('Patients Page', () => {
  describe('getPatient()', () => {
    it('returns a detail view for the patient', () => {
      expect(screen.getByText('Laila Paul')).toBeInTheDocument()
    })

  })
})