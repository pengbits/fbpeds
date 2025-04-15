import { datePretty,dateTimePretty } from "../../util/date"
const PatientAppointmentsList = ({appointments}) => {
  if(!appointments || !appointments.length) return null

  return (<>
  <h4>Upcoming Appointments:</h4>
  <ul>
    {appointments.map(({datetime,provider_name,provider_id}) => {
      const key = `${provider_id}__${datePretty(datetime).replace(' ','__')}`
      return <li key={key}>Well visit on {dateTimePretty(datetime)} with {provider_name}</li>
    })}
  </ul>
  </>)
}

export default PatientAppointmentsList