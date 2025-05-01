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


const GrowthChart = ({data}) => {
  if(data && data.datasets) {
  return <Line
    datasetIdKey='growth_id'
    data={data}
  />
  } else {
    return null
  }
}

export default  GrowthChart
