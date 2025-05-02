import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


// 218 entries in each percentile slice, divided by 18 year range
// gives us 12 points of data for the line graph
const step_size = Math.floor(218 / 18)
const getPercentileLineData = (key,data) => {
//   const {length} = data[key]
  let out = []; data[key].map((value,i) => {
    if(i % step_size == 0) out.push(value)
  })
  return out
}

const GrowthChart = (props) => {
  const generic = props.data.generic.data
  const labels = Array(18).fill(1).map((_,i) => i+1)
  const percentKeys = Object.keys(generic)
  console.log(percentKeys)
  return <Line
    datasetIdKey='growth_id'
    data={{
    labels,
    datasets: percentKeys.map(k => ({
      label:k,
      data:getPercentileLineData(k, generic)
    }))
  }}
  />

}

export default  GrowthChart
