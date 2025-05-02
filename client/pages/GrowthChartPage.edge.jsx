import { useEffect } from "react"
import { data, useParams } from "react-router"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"
import GrowthChart from "../components/charts/GrowthChart"
import { Heading} from "@radix-ui/themes"
const GrowthChartPage = () => {
  const {
    generic,
    error,
    fetchGenericPercentileChart,
    getChart
  } = useStore((state) => state.charts)

  useEffect(() => {
    fetchGenericPercentileChart({chart:'height', gender:'female'})
    fetchGenericPercentileChart({chart:'weight', gender:'female'})
    
  
  },[])

  
  console.log(generic.height, generic.weight)

  return (
    <>
      <Heading size="6" as='h2'>Growth Chart</Heading>
      <Heading size="3" as='h3'>Height vs Age</Heading>
      
      {/* <Heading size="3" as='h3'>Weight vs Age</Heading>
      {weight && generic.weight && <GrowthChart 
        data={{
          weight,
          generic: generic.weight
        }}
      />} */}
    </>
  )
}
export default GrowthChartPage