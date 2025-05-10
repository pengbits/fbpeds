import PatientListItem from "./PatientListItem"

const PatientList = ({patients}) => {
  return (<div className="patients">
    {(patients || []).map(PatientListItem)}
  </div>)
}

export default PatientList