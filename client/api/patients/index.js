export const getPatients = async () => {
  const url = `/api/patients`
  console.log(`getPatients() ${url}`)
  const response = await fetch(url, {method:'GET'})
  // console.log(response.status)
  const json = await response.json() 
  return json
}