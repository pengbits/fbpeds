import {describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react'
import App from './App'
import getPatientsMock from './mocks/getPatients.js'

beforeEach(() => {
  fetch.resetMocks()
})

describe('App', () => {
  it('renders the App component', async () => {
    fetch.mockResponseOnce(JSON.stringify(getPatientsMock))
    const rendered = await act(() => render(<App />))
    expect(screen.getByText('Patients')).toBeInTheDocument();
  })
})