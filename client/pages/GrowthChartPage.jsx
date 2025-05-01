import { useParams } from "react-router"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"
import GrowthChart from "../components/charts/GrowthChart"
import {transform} from '../api/charts/index'
import getPatientGrowthMock from "../mocks/getPatientGrowth"
import { Heading} from "@radix-ui/themes"
const GrowthChartPage = () => {
  const {
    visit,
    loading,
    error,
  } = useStore((state) => state.patients)
  

  return (
    <>
      <Heading size="6" as='h2'>Growth Chart</Heading>
      <Heading size="3" as='h3'>Height vs Age</Heading>
      <GrowthChart 
        data={transform(getPatientGrowthMock[0].growth, {chart:'height'})}
      />
      <Heading size="3" as='h3'>Weight vs Age</Heading>
      <GrowthChart 
        data={transform(getPatientGrowthMock[0].growth, {chart:'weight'})}
      />
    </>
  )
}
export default GrowthChartPage