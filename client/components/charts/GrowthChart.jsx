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
const step_size = Math.floor(218 / 16)
const getPercentileLineData = (key,data) => {
//   const {length} = data[key]
  let out = []; data[key].map((value,i) => {
    if(i % step_size == 0) out.push(value)
  })
  return out
}
const percent_colors = {
  '3%':'#d7d7d7', 
  '5%':'#4688f1', 
  '10%':'#d9463d', 
  '25%':'#f2b329', 
  '50%':'#1d9c5a', 
  '75%':'#fc0e1b', 
  '90%':'#4cbdc5', 
  '95%':'#aa39c1', 
  '97%':'#c1bb34'
}
const GrowthChart = (props) => {
  const generic = props.data.generic.data
  const labels = []; for(let i=2; i<18; i++){
    labels.push(i)
  }


  const percentKeys = Object.keys(generic)
  const sortedKeys = percentKeys.sort((a,b) => {
    const a_ = Number(a.slice(0,-1))
    const b_ = Number(b.slice(0,-1))
    return b_ - a_
  })
  const options = {
    plugins: {
      legend: {
        position:'right',
        align:'start',
        labels: {
          boxWidth:4,
          boxHeight:4
        }
      },
      tooltip: {
        callbacks: {
          title: ([{label}]) => (`${label} Years`),
          labelPointStyle: (context) => ({pointStyle: 'triangle', rotation: 0})
        }
      }
    }
  }

  return <Line
    datasetIdKey='growth_id'
    options={options}
    data={{
    labels,
    datasets: sortedKeys.map(k => ({
      label:k,
      pointStyle:false,
      data:getPercentileLineData(k, generic),
      borderColor: percent_colors[k] || '#FF0000'
    })).concat([{
      label: 'patient',
      borderWidth: 4,
      pointStyle:'rect',
      rotation:45,
      data: props.data.height.datasets[0].data,
      borderColor: '#d67323'
    }])
  }}
  />

}

export default  GrowthChart
