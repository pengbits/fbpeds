import { screen, render, act } from '@testing-library/react'
import VisitDetailsPage from './VisitDetailsPage'
import {getVisitWithImage} from '../mocks/getVisit'
import { renderComponentWithRoute } from '../test/routerUtils'
import { afterEach, describe, expect } from 'vitest'

beforeEach(async () => {
  fetch.resetMocks()
  vi.mock('react-router', async (importOriginal) => {
    const module = await importOriginal()
    return {
      ...module,
      useParams:() => {
        return {id:'2',visitId:'143'}
      }
    }
  })
})

afterEach(() => {
  fetch.resetMocks()
})


describe('Visit Details Page', () => {
  describe('getVisit()', () => {
    it('displays the visit details', async () => {
      fetch.mockResponseOnce(JSON.stringify(getVisitWithImage))
      
      await renderComponentWithRoute(VisitDetailsPage)
      expect(screen.getByText('Well Visit with Dr. Miyoko Onishi')).toBeInTheDocument()
      expect(screen.getByText('Aug 26 2021')).toBeInTheDocument()
      expect(screen.getByAltText('image of patient')).toBeInTheDocument()
      expect(screen.getByText('50 in')).toBeInTheDocument()
      expect(screen.getByText('61 lbs')).toBeInTheDocument()
    })  

   
  })
})



