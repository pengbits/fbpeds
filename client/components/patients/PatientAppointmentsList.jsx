import dayjs from "dayjs"

const PatientAppointmentsList = ({appointments}) => {
  if(!appointments.length) return null

  return (<>
  <h4>Upcoming Appointments:</h4>
  <ul>
    {appointments.map(({datetime,provider_name}) => {
      const datePretty = dayjs(datetime).format('MMM')
      const timePretty = dayjs(datetime).format('H:MM')
      return <li key={`${provider_name}${datePretty}`}>Well visit on {datePretty} at {timePretty} with {provider_name}</li>
    })}
  </ul>
  </>)
}

export default PatientAppointmentsList