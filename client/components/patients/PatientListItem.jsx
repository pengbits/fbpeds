import PatientLink from "./PatientLink"
import { Link } from "react-router"
import PatientAppointmentsList from "./PatientAppointmentsList"

export default (({id,name,image,appointments}) => (
<div key={id} className="patient">
  <h3 data-testid="patient-name" className="patient__name">
    <PatientLink id={id}>
    {name}
    </PatientLink>
  </h3>
  {image && <div className="patient__image">
    <PatientLink id={id}>
      <img src={image} alt="image of patient" />
    </PatientLink>
  </div>}
  <Link to={`/appointments/new/patient/${id}`}>
    Book a Visit
  </Link>
  <PatientAppointmentsList appointments={appointments} />
</div>))