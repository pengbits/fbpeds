import useAppStore from "./appStore"
import { renderHook, act } from "@testing-library/react"
import getProviderAvailabilityMock from "../mocks/getProviderAvailibility"
import createAppointmentMock from "../mocks/createAppointment"
import { expect } from "vitest"

// I'm not sure this really falls under 'store', but it is cross-domain
// in the real user flow, this is all handled by AppointmentSearchPage,
// scoped to a patient, but using appointment apis: (getProviderAvailability, createAppointment)

// This is arguably testing the implementation, ie tight coupling, an anti-pattern,
// but as an excercise in asserting against zustand stores, it'll do. 
let result
let providersWithAvailability

beforeEach(() => {
  result = renderHook(() => useAppStore()).result
})

const getState = (result) => (result.current.appointments)

describe('Store', () => {
  describe('create appointment ', async () => {
    test('given a provider_id, patient_id, and a visit_type', () => {
      const attrs = {
        patient_id: 3,
        visit_type: 'WELL',
        date: '2025-05-05'
      }
      act(() => {
        const {setAppointment} = getState(result)
        setAppointment(attrs)
      })
      expect(getState(result).appointment).toEqual(expect.objectContaining({
        patient_id: 3,
        visit_type: 'WELL',
        date: '2025-05-05'
      }))
    })
    
    test('when I fetch the availabiity', async () => {
      fetch.mockResponseOnce(JSON.stringify(getProviderAvailabilityMock))

      await act(async () => {
        await getState(result).fetchProviderAvailability()
      })
    })
    
    test('then there will be a list of time slots', () => {
      providersWithAvailability = getState(result).providersWithAvailability
      expect(providersWithAvailability.length).toBeGreaterThan(0)
    })

    test('when I click on a time slot', () => { 
      const {slots} = providersWithAvailability[0].availability[0], {length} = slots
      const s = Math.floor(Math.random() * length), slot = slots[s]
      expect(slot).toEqual(expect.objectContaining({
        'start':{ 'hours': expect.any(Number), 'mins': expect.any(Number)},
        'end':{'hours': expect.any(Number), 'mins': expect.any(Number)},
      }))
    })

    test('then it will send the appointment attrs to the server', async () => {
      fetch.mockResponseOnce(JSON.stringify(createAppointmentMock))

      await(act(async() => {
        await getState(result).createAppointment(getState(result).appointment)
      }))
    })

    test('when it loads', () => {
      expect(getState(result).loading).toBe(false)
    })

    test('the appointment will be created', () => {
      // this is a counter-inituitve assertion but the form 
      // will be emptied of attributes on success...
      // display of the new appointment happens in a different page
      expect(getState(result).appointment).toEqual({})
    })
  })
})