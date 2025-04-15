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
  return await response.json()
}

export const getPatientImmunizations = async (id) => {
  // simulate latency
  console.log(`API.getPatientImmunizations ${id}`)
  await new Promise((res) => setTimeout(res, 1000))
  const data = await  getPatient(id, {include:'immunizations'})
  console.log(`API.getPatientImmunizations READY`)
  return data
}