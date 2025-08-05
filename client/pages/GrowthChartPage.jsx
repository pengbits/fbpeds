import { useParams } from "react-router"
import { useState, useMemo, useCallback, useEffect } from "react"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"

import {transform} from '../api/charts/index'
import getPatientGrowthMock from "../mocks/getPatientGrowth.1"
import getGenericHeightAgeGirlsMock from "../mocks/getGenericPercentileChart/HeightAgeGirls"
import getGenericWeightAgeGirlsMock from "../mocks/getGenericPercentileChart/WeightAgeGirls"
const GenericMock = {
  weight: getGenericWeightAgeGirlsMock.data,
  height: getGenericHeightAgeGirlsMock.data
}

import PatientCharts from "../components/charts/PatientCharts"
import { Heading, Button} from "@radix-ui/themes"
const GrowthChartPage = () => {
  const {
    visit,
    loading,
    error,
  } = useStore((state) => state.patients)
  const [generic,setGeneric] = useState({})
  const heightData = transform(getPatientGrowthMock[0].growth, {chart:'height'})
  const weightData = transform(getPatientGrowthMock[0].growth, {chart:'weight'})
  // console.log(heightData)

  const getGeneric = async () => {
    console.log('getGeneric')
    const g = await new Promise(res => setTimeout(res, 1000, GenericMock))
    setGeneric(g)
  }
  

  useEffect(() => {
    console.log('useEffect -> getGeneric')
    getGeneric()
  }, [])

  return (
    <>
      <Heading size="6" as='h2'>Growth Chart</Heading>
      <Heading size="3" as='h3'>Height vs Age</Heading>
      <PatientCharts 
        generic={generic}
        patient={{
          height:heightData,
          weight:weightData
        }}
      />
      <Button onClick={e => getGeneric()}>getGeneric() </Button>
    </>
  )
}
export default GrowthChartPage