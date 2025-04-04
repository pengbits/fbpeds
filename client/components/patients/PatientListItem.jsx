import PatientLink from "./PatientLink"
const PatientListItem = (({id,name,image}  )=> (
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
</div>))

export default PatientListItem