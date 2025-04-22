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

export const deleteAppointment = async (id) => {
  const url = `/api/appointments/${id}`
  console.log(`API.deleteAppointment`, attrs)
  const response = await fetch(url, {
      method: 'DELETE'
  })
  if(response.status !== 204){
    throw new Error('unexpected response')
  }
  console.log('DELETE ok')
  return {success:true, id}
}