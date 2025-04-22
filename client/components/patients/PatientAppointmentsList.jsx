import { datePretty,dateTimePretty } from "../../util/date"
import { visitTypePretty } from "../../util/string"
import { deleteAppointment } from "../../api/appointments"
const PatientAppointmentsList = ({appointments}) => {
  if(!appointments || !appointments.length) return null

  const cancel = async (id) => {
    if(confirm('Are you sure?')){
      const res = await deleteAppointment(id)
      console.log(res)
    }
  }

  return (<div className="appointment-list">
    <h4>Upcoming Appointments:</h4>
    {appointments.map((a,idx) => {
      const headline = `${visitTypePretty(a.visit_type)} visit on ${dateTimePretty(a.datetime)} with ${a.provider_name}`
      
      return (<div
        data-testid="appointment-list-item" 
        className="appointment" 
        key={idx}
      ><span className="appointment__headline">
          {headline}
        </span>
        <span className="appointment__options">
          <a className="btn sm danger" href="#" data-id={a.appointment_id} onClick={e => cancel(a.appointment_id)}>cancel</a>{' '}
          <a className="btn sm" href="#" onClick={e => handleClick('reschedule')}>reschedule</a>{' '}
        </span>
      </div>)
    })}
  </div>)
}

export default PatientAppointmentsList