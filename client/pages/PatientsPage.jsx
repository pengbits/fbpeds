import { useLoaderData, NavLink } from "react-router"
import PatientListItem from "../components/PatientListItem"

const PatientsPage = () => {
  const patients = useLoaderData()

  return (<>
      <div className="patients">
        <h2>Patients</h2>
        {patients.map(PatientListItem)}
      </div>
      <NavLink className="btn btn--large" 
          to="/appointments/new">Book Your Next Appointment
      </NavLink>
    </>
  )
}
export default PatientsPage