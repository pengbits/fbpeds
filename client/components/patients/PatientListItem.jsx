import PatientLink from "./PatientLink"
import { Link } from "react-router"
import PatientAppointmentsList from "./PatientAppointmentsList"

export default (({id,name,image,appointments}) => (
<div key={id} className="patient">
  <div className="patient__head">
    {image && <div className="patient__image">
      <PatientLink id={id}>
        <img src={image} alt="image of patient" />
      </PatientLink>
    </div>}

    <div className="patient__actions">
      <h3 data-testid="patient-name" className="patient__name">
        <PatientLink id={id}>
        {name}
        </PatientLink>
      </h3>
      <Link to={`/appointments/new/patient/${id}`}>
        Book a Visit
      </Link>
    </div>
  </div>
  <div className="patient__footer">
  <PatientAppointmentsList appointments={appointments} />
  </div>
  
</div>))