
import { datePretty } from "../../util/date"
import {sortData } from "../../store/patientStore"

// coerce data from db into the correct shape for charts
export const transform = (rows, opts={}) => {
  if(!opts.chart) return []
  let k
  switch (opts.chart){
    case 'height':
      k = 'height_cm';
      break
    case 'height_percent':
    case 'weight':
    case 'weight_percent':
      k = opts.chart
      break;
    default:
      throw new Error('unknown chart type:'+ opts.chart)
    }

  const sortedData = sortData(rows.filter(r => r.age_years > 1), {type:'growth',order:'asc'}).map(r => ({
    label: `${r.age_years} years`,
    [k] : r[k],
  }))
  return {
    labels: sortedData.map(r => r.label),
    datasets: [{
      label: k,
      data: sortedData.map(r => r[k])
    }]
  }
}

// return the static dataset for building percentile views 
const resource_map = {
  height_age_boys  :'HeightAgeBoys' ,
  height_age_girls :'HeightAgeGirls',
  weight_age_boys  :'WeightAgeBoys' ,
  weight_age_girls :'WeightAgeGirls' 
}

export const getGenericPercentileChart = async (opts={}) => {
  if(!opts.chart || !['height','weight'].includes(opts.chart)){
    throw new Error('must provide either height or weight chart type:'+ opts.chart)
  }
  if(!opts.gender || !['male','female'].includes(opts.gender)){
    throw new Error('must provide either male or female gender')
  }
  const key      = [opts.chart, 'age', (opts.gender == 'female' ? 'girls':'boys')].join('_')
  const resource = resource_map[key]
  const url      = `/resources/${resource}.json`
  console.log(`getGenericPercentileChart: ${url}`)
  const res = await fetch(url)
  const {data}= await res.json()
  return data
  //  {
  //   datasets:[{
  //     data:json
  //   }]
  // }
}