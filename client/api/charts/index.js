
import { datePretty } from "../../util/date"
import {sortData } from "../../store/patientStore"

// coerce data from db into the correct shape for charts
export const transform = (rows, opts={}) => {
  if(!opts.chart) return []
  let k
  switch (opts.chart){
    case 'height':
    case 'height_percent':
    case 'weight':
    case 'weight_percent':
      k = opts.chart
      break;
    default:
      throw new Error('unknown chart type:'+ opts.chart)
    }
  
  return {
    labels: rows.map(r => r.age_years),
    datasets: [{
      label: k,
      data: sortData(rows, {type:'growth',order:'asc'})
        .map(r => r[k])
      // data: rows.map(r => r[k])
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
  const json= await res.json()
  return json
  
}