export const getProviders = async () => {
  const url = `/api/providers`
  console.log(`getProviders() ${url}`)
  const response = await fetch(url)
  const json = await response.json()
  // simulate latency
  return new Promise(res => setTimeout(res, 2000, json))
  return json
}
export const getProvider = async (id) => {
  const url = `/api/providers/${id}`
  console.log(`getProvider() ${url}`)
  const response = await fetch(url)
  const json = await response.json()
  // simulate latency
  return new Promise(res => setTimeout(res, 2000, json))
  return json
}

export const getAvailability = async (date) => {
  const url = `/api/providers/availability/${date}` //'2025-04-01')
  console.log(`getAvailability() ${url}`)
  const response = await fetch(url)
  const json = await response.json()
  // simulate latency
  return new Promise(res => setTimeout(res, 2000, json))
  return json
}