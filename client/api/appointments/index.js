export const getProviderAvailability = async (attrs) => {
  const url = `/api/providers/availability/${attrs.date}`
  console.log(`getProviderAvailability() ${url}`)
  const response = await fetch(url, {method:'GET'})
  return await response.json()
}