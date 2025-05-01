// coerce data from db into correct shape for charts

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
      data: rows.map(r => r[k])
    }]
  }
}