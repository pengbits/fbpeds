import { screen, act, fireEvent, within, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientGrowthMock from "../../mocks/getPatientGrowth.1"
import HeightAgeGirlsMock from '../../mocks/getGenericPercentileChart/HeightAgeGirls'
import {getGenericPercentileChart, transform} from '../../api/charts/index' 
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
      
      const expectedLabels = growth.sort((a,b) => (a.date < b.date ? -1 : 1))
        .filter(r => r.age_years > 1)
        .map(r => `${r.age_years} years`)
       expect(data.labels).toEqual(expectedLabels)

      const expectedData = growth
        .filter(r => r.age_years > 1).map(r => r.height_cm)
      expect(data.datasets[0].data).toEqual(expectedData)
    })
    
  })

  describe('getGenericPercentileChart()', () => {
    it('returns generic cdc values for building the percentile views', async () => {
      fetch.once(JSON.stringify(HeightAgeGirlsMock))
      const data = await getGenericPercentileChart({chart:'height', gender:'female'})
      
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