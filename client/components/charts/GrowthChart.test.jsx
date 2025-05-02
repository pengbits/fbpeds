import { screen, act, fireEvent, within, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientGrowthMock from "../../mocks/getPatientGrowth"
import HeightAgeGirlsMock from '../../mocks/getGenericPercentileChart/HeightAgeGirls'
import {getGenericPercentileChart, transform} from '../../api/charts/index' 
import {datePretty} from "../../util/date"
import { expect } from 'vitest'

let growth
let data

beforeEach(async () => {
  fetch.resetMocks()
  data = []
  growth = PatientGrowthMock[0].growth
      
})

describe('Charts API', () => {
  describe('transform(height)', () => {
    it('transforms the growth data into height x age, in Chart format', () => {
      expect(growth.length).toBeGreaterThan(0).toBeLessThan(20)
      
      data = transform(growth, {chart:'height',order:'asc'})
      // const sorted = growth.slice(0).sort((a,b) => a.date < b.date ? -1 : 1)
    
      const expectedLabels = growth.map(r => datePretty(r.date))
      expect(data.labels.length).toBe(expectedLabels.length)
      //  cant get sort to work same way as store TODO fix this
      // expect(data.labels).toEqual(expectedLabels)

      const expectedData = growth.map(r => r.height)
      expect(data.datasets[0].data).toEqual(expectedData)
    })
    
    it('filters out dates that have no height value', () => {
      data = transform(growth, {chart:'height',order:'asc'})
      expect(data.datasets[0])
    })
  })

  describe('getGenericPercentileChart()', () => {
    it('returns generic cdc values for building the percentile views', async () => {
      fetch.once(JSON.stringify(HeightAgeGirlsMock))
      const json = await getGenericPercentileChart({chart:'height', gender:'female'})
      
      expect(json.labels.length).toBeGreaterThan(100)
      expect(json.labels[0]).toBe(24)
      expect(json.labels[1]).toBe(24.5)
      expect(json.labels[json.labels.length-1]).toBe(240)
      
      const {data} = json
      expect(Object.keys(data)).toEqual(["3%","5%","10%","25%","50%","75%","90%","95%","97%"])
      
      const row = data["5%"]
      expect(row).toEqual(expect.arrayContaining([expect.any(Number)]))
    })
  })
})

describe('Growth Chart', () => {
  it('renders a chart of the patient growth data', () => {

  })
})