export const getVisit = async (patientId, visitId) => {
  const url = `/api/patients/${patientId}/visits/${visitId}`
  const response = await fetch(url, {method:'GET'})
  const json = await response.json()
  return json
}