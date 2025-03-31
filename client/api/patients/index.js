export const getPatients = async () => {
  const url = `/api/patients`
  console.log(`getPatients() ${url}`)
  const response = await fetch(url, {method:'GET'})
  // console.log(response.status)
  const json = response.json()
  // fake delay
  // return new Promise(res => setTimeout(res, 2000, json))
  return json
}