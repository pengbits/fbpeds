import { screen, act, fireEvent, within, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PatientGrowthMock from "../../mocks/getPatientGrowth"
import {transform} from '../../api/charts/index' 
import {datePretty} from "../../util/date"
beforeEach(async () => {
  fetch.resetMocks()
})

let data
describe('Charts API', () => {
  it('transforms the growth data into something that the Chart can use', () => {
    const {growth} = PatientGrowthMock[0]
    expect(growth.length).toBeGreaterThan(0).toBeLessThan(20)
    
    data = transform(growth, {chart:'height'})
    const expectedLabels = growth.map(r => r.age_years)
    expect(data.labels.length).toBe(expectedLabels.length)
    expect(data.labels).toEqual(expectedLabels)

    const expectedData = growth.map(r => r.height)
    expect(data.datasets[0].data).toEqual(expectedData)
  })
})
describe('Growth Chart', () => {
  it('renders a chart of the patient growth data', () => {

  })
})