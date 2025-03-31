import { useLoaderData } from "react-router"
import PatientListItem from "../components/PatientListItem"

const PatientsPage = () => {
  const patients = useLoaderData()
  
  return (
    <div className="patients">
      <h2>Patients</h2>
      {patients.map(PatientListItem)}
    </div>
  )
}
export default PatientsPage