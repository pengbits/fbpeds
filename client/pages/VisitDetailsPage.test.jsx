import { screen, render, act } from '@testing-library/react'
import VisitDetailsPage from './VisitDetailsPage'
import getVisitMock from '../mocks/getVisit'
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach, describe } from 'vitest'

beforeEach(async () => {
  // // fetch.resetMocks()
  // fetch.mockResponseOnce(JSON.stringify(getProvidersMock))
  // await renderComponentWithRoute(ProvidersPage)
      
})

afterEach(() => {
  fetch.resetMocks()
})


describe('Visit Details Page', () => {
  describe('getVisit()', () => {
    it('displays the visit details', async () => {
      fetch.mockResponseOnce(JSON.stringify(getVisitMock))
      await renderComponentWithRoute(VisitDetailsPage)
      // expect(await screen.findByText('Well Visit')).toBeInTheDocument()
      // const {length} = getProvidersMock
      // expect(await screen.findAllByTestId('provider-entry')).toHaveLength(length)
      
      // const providersWithImage = getProvidersMock.filter(p => !!p.image)
      // expect(await screen.findAllByAltText('image of provider')).toHaveLength(providersWithImage.length)
    })  

   
  })
})



