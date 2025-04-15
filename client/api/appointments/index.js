export const getProviderAvailability = async (attrs) => {
  const url = `/api/providers/availability/${attrs.date}`
  // console.log(`getProviderAvailability() ${url}`)
  const response = await fetch(url, {method:'GET'})
  return await response.json()
}

export const createAppointment = async (attrs) => {
  // console.log(`API.createAppointment`, attrs)
  const url = `/api/appointments`
  const response = await fetch(url, {
    method:'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(attrs)
  })
}