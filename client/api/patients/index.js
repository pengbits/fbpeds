export const getPatients = async () => {
  const url = `/api/patients`
  // console.log(`getPatients() ${url}`)
  const response = await fetch(url, {method:'GET'})
  const json = await response.json()
  // simulate latency
  return new Promise(res => setTimeout(res, 2000, json))
}

export const getPatient = async (id, opts={}) => {
  let url = `/api/patients/${id}`
  if(opts.include) url = `${url}/${opts.include}`
  // console.log(`getPatient() ${url}`)
  const response = await fetch(url, {method:'GET'})
  const json = await response.json()
  // simulate latency
  return new Promise(res => setTimeout(res, 2000, json))
}

