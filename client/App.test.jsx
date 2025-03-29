import {describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the App component', async () => {
    const rendered = await act(() => render(<App />))
    screen.debug()
      expect(screen.getByText('Patients')).toBeInTheDocument();
  })
})