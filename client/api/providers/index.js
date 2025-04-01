export const getAvailability = async (date) => {
  const url = `/api/providers/availability/${date}` //'2025-04-01')
  console.log(`getAvailability() ${url}`)
  const response = await fetch(url)
  return await response.json()
}