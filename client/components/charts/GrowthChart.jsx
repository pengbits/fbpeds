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


const GrowthChart = (props) => {
  const generic = props.data[1]
  const {length} = generic.data['3%']
  const labels = Array(18).fill(1).map((_,i) => i+1)
  const step_size = Math.floor(generic.data['3%'].length / labels.length)
  console.log(generic.data['3%'].length, step_size)
  const data = []; generic.data['3%'].map((value,i) => {
    if(i % step_size == 0) data.push(value)
  })
  
  return <Line
    datasetIdKey='growth_id'
    data={{
    labels,
    datasets: [{
      label: '3%',
      data
    }]
  }}
  />

}

export default  GrowthChart
