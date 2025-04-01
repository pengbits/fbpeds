import PatientListItem from "./PatientListItem"

const PatientList = ({patients}) => (
  <div className="patients">
    <h2>Patients</h2>
    {(patients || []).map(PatientListItem)}
  </div>
)

export default PatientList