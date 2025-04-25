import { dateTimePretty } from "../../util/date"
import { visitTypePretty } from "../../util/string"
import { Link } from "react-router"
import useAppStore from "../../store/appStore"
const PatientAppointmentsList = ({appointments, patientId}) => {
  if(!appointments || !appointments.length) return null
  
  const {deleteAppointment} = useAppStore(state => state.appointments)
  const {removeAppointmentFromPatient} = useAppStore(state => state.patients)
  
  const cancel = async (appointmentId) => {
    if(confirm('Are you sure?')){
      const res = await deleteAppointment({patientId,appointmentId})
      removeAppointmentFromPatient({patientId,appointmentId})
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
          <Link className="btn sm" to={`/appointments/${a.appointment_id}/edit`}>reschedule</Link>
        </span>
      </div>)
    })}
  </div>)
}

export default PatientAppointmentsList