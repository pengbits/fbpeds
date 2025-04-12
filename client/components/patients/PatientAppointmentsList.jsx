import dayjs from "dayjs"

const PatientAppointmentsList = ({appointments}) => {
  if(!appointments || !appointments.length) return null

  return (<>
  <h4>Upcoming Appointments:</h4>
  <ul>
    {appointments.map(({datetime,provider_name,provider_id}) => {
      const datePretty = dayjs(datetime).format('MMM DD')
      const timePretty = dayjs(datetime).format('H:MM')
      const key = provider_id+ '__'+dayjs(datetime).format('YYYY-MM-DDTHH:mm:ss')
      // console.log(key)
      return <li key={key}>Well visit on {datePretty} at {timePretty} with {provider_name}</li>
    })}
  </ul>
  </>)
}

export default PatientAppointmentsList