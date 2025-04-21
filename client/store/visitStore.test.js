import { renderHook, act } from "@testing-library/react"
import useAppStore from "./appStore"
import getVisitMock from "../mocks/getVisit"

let result
let state
const patientId = 2
const visitId = 143

beforeEach(() => {
  result = renderHook(() => useAppStore()).result
})

const getState = (result) => (result.current.visits)

describe('visit store', () => {
  describe('fetchVisit()', () => {
    test('it updates the store with the visit data', async () => {      
      fetch.mockResponseOnce(JSON.stringify(getVisitMock))
      const {fetchVisit} = getState(result)
      await act(async () => fetchVisit(patientId, visitId))
      state = getState(result)
      expect(state.loading).toBe(false)
      expectAttributes(state.visit, [
        'provider_id',
        'provider_name',
        'visit_type',
        'visit_date',
        'height',
        'height_percent',
        'weight',
        'weight_percent',
        'bmi_percent',
        'image'
      ])

    })
  })
})