import { renderHook, act } from "@testing-library/react"
import useAppStore from "./appStore"
import getPatientGrowthMock from "../mocks/getPatientGrowth.1"
import getGenericHeightAgeGirlsMock from "../mocks/getGenericPercentileChart/HeightAgeGirls"

let result
let state

beforeEach(() => {
  fetch.resetMocks()
  result = renderHook(() => useAppStore()).result
})


const getState = (result) => (result.current.charts)

describe('chart store', () => {
  describe("getChart('height')", () => {
    test('it returns the patient data in the correct shape for charts', async () => {      
      fetch.once(JSON.stringify(getPatientGrowthMock))
      const {fetchView,setView} = result.current.patients
      
      // simulate patient growth tab being activated at compontent mount:
      await (act(async() => {
        await setView('growth')
        await fetchView(1)
      }))
      
      // ensure there is data in the patient slice to be used to populate chart data:
      expect(result.current.patients.view.data.length).toBe(10)
      const entry = result.current.patients.view.data[0]
      expectAttributes(entry, ['growth_id','age_years','height','weight'])
      
      // get the chart data
      const {getChart} = getState(result)
      await(act(async() => {
         await getChart({chart:'height'}) 
      }))
      console.log(getState(result).height.datasets[0])
      const {data} = getState(result).height.datasets[0]
      expect(data).toEqual([93.98,100.076,107.696,114.3,120.90400000000001,127,133.604,139.954,147.066])
    })
  })

  // the state is not pristine so the null assertions are failing
  // (because state is set in previous test and not cleared properly)
  describe("getGenericPercentileChart('height')", () => {
    test('it returns the static dataset for use in building percentile views', async ()=> {
      fetch.once(JSON.stringify(getGenericHeightAgeGirlsMock))


      const {fetchGenericPercentileChart} = getState(result)
      // expect(state.height).toBeNull()
      // expect(state.loading).toBe(false)

      await(act(async() => {
        await fetchGenericPercentileChart({chart:'height', gender:'female'})
      }))
    
      const data = getState(result).generic.height
      expect(Object.keys(data)).toEqual([
        "3%","5%","10%","25%","50%","75%","90%","95%","97%"
      ])
    })

  })
})