import { Heading, Box } from "@radix-ui/themes";
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


// 218 entries in each percentile slice, divided by 2-18 year range gives us our step size,
// so we know when to draw one of the points of data for the line graph
const step_size = Math.floor(218 / 16)
const getPercentileLineData = (key,data) => {
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
  const {
    title,  
    ylabel,
    xlabel
  } = props
  const {
    generic, 
    patient
  } = props.data

  const labels = []; for(let i=2; i<18; i++){
    labels.push(i)
  }


  const percentKeys = Object.keys(generic)
  const sortedKeys = percentKeys.sort((a,b) => {
    const a_ = Number(a.slice(0,-1)) // '3%' => 3
    const b_ = Number(b.slice(0,-1)) // '3%' => 3 
    return b_ - a_
  })

  const options = {
    scales: {
      x: {
        title: {
          text: xlabel,
          display: true
        }
      },
      y: {
        title: {
          text: ylabel,
          display:true
        }
      },
    },
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
          labelPointStyle: (context) => ({pointStyle: 'triangle', rotation: 0}),
        }
      },
      animation: false
    }
  }

  return (<Box className="card">
    <Line
      datasetIdKey='growth_id'
      options={options}
      data={{
      labels,
      datasets: sortedKeys.map(k => ({
        label:k, // 3%
        pointStyle:false,
        data:getPercentileLineData(k, generic),
        borderColor: percent_colors[k] || '#FF0000'
      }))
      .concat([{
        label: 'patient',
        borderWidth: 4,
        pointStyle:'rect',
        rotation:45,
        data: patient.datasets[0].data,
        borderColor: '#d67323'
      }])
    }}
    />
  </Box>)
}

export default  GrowthChart
