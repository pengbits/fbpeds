export const getPatients = async () => {
  const url = `/api/patients`
  // console.log(`getPatients() ${url}`)
  const response = await fetch(url, {method:'GET'})
  const json = await response.json()
  // console.log(json)
  return json
}

export const getPatient = async (id, opts={}) => {
  let url = `/api/patients/${id}`
  if(opts.include) url = `${url}/${opts.include}`
  // console.log(`getPatient() ${url}`)
  const response = await fetch(url, {method:'GET'})
  const data = await response.json()
  return data
}

