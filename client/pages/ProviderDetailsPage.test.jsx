import { screen, act, fireEvent, within, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getProviderMock from '../mocks/getProvider'
import ProviderDetailsPage from './ProviderDetailsPage'
import { renderComponentWithRoute } from '../test/routerUtils'


beforeEach(async () => {
  fetch.resetMocks()
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module,
      useParams:() => {
        return {id:'2'}
      }
    }
  })
})

describe('Provider Details Page', () => {
  describe('getProvider()', () => {
    it('returns a detail view for the provider', async () => {
      fetch.once(JSON.stringify(getProviderMock))
      await renderComponentWithRoute(ProviderDetailsPage)

      // console.log(JSON.stringify(getProviderMock))
      await act(async() => {
        expect(await screen.findByText('Dr. Karen Teoh, MD, PhD')).toBeInTheDocument()
      })
    })
  })
})