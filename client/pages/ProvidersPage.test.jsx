import { screen, render, act } from '@testing-library/react'
import getProvidersMock from '../mocks/getProviders'
import ProvidersPage from './ProvidersPage'
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach } from 'vitest'

beforeEach(async () => {
  // // fetch.resetMocks()
  // fetch.mockResponseOnce(JSON.stringify(getProvidersMock))
  // await renderComponentWithRoute(ProvidersPage)
      
})

afterEach(() => {
  fetch.resetMocks()
})


describe('Providers Page', () => {
  describe('getProviders()', () => {
    it('displays a list of providers', async () => {
      fetch.mockResponseOnce(JSON.stringify(getProvidersMock))
      await renderComponentWithRoute(ProvidersPage)
      expect(await screen.findByText('Providers')).toBeInTheDocument()
      const {length} = getProvidersMock
      expect(await screen.findAllByTestId('provider-entry')).toHaveLength(length)
    })  

    it('displays an error on failure', async() => {
      fetch.mockReject(new Error('network error'))
      await renderComponentWithRoute(ProvidersPage)
      expect(await screen.findByTestId('error-message'))
      .toBeInTheDocument()
      //expect(screen.findAllByText('error')).toBeInTheDocument()
    })

  })
})



