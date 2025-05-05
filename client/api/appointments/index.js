export const getProviderAvailability = async (attrs) => {
  const url = `/api/providers/availability/${attrs.date}`
  // console.log(`getProviderAvailability() ${url}`)
  const response = await fetch(url, {method:'GET'})
  const json = await response.json()
  return json
  // return new Promise(res => setTimeout(res, 2000, json))
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
  console.log(`API.deleteAppointment`, id)

  const response = await fetch(url, {
      method: 'DELETE'
  })

  if(![200,204].includes(response.status)){
    // vitest-fetch-mock only happy with 200 for some reason
    throw new Error('unexpected response')
  }

  return {success:true, id}
}

export const getAppointment = async (id) => {
  const url = `/api/appointments/${id}`
  const response = await fetch(url)
  return await response.json()
}

export const updateAppointment = async({appointment_id, ...attrs}) => {
  const url = `/api/appointments/${appointment_id}`
  console.log(`API.updateAppointment`, appointment_id, attrs)
  if(!appointment_id) throw new Error('appointment_id is required to update appointment')
  const response = await fetch(url, {
      method: 'PUT',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(attrs)
  })
  return await response.json()
}