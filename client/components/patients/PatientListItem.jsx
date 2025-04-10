import PatientLink from "./PatientLink"
import PatientAppointmentsList from "./PatientAppointmentsList"

const PatientListItem = (({id,name,image,appointments}  ) => (
<div key={id} className="patient">
  <h3 data-testid="patient-name" className="patient__name">
    <PatientLink id={id}>
    {name}
    </PatientLink>
  </h3>
  <div className="patient__image">
    <PatientLink id={id}>
      <img src={image} alt="image of patient" />
    </PatientLink>
  </div>
  <PatientAppointmentsList appointments={appointments} />
</div>))

export default PatientListItem