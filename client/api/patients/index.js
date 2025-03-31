export const getPatients = async () => {
  const url = `/api/patients`
  console.log(`getPatients() ${url}`)
  const response = await fetch(url, {method:'GET'})
  return await response.json()
}

export const getPatient = async (id) => {
  const url = `/api/patients/${id}`
  console.log(`getPatient() ${url}`)
  const response = await fetch(url, {method:'GET'})
  return await response.json()
}