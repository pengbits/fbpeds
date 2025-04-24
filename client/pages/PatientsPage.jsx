import { useEffect } from "react"
import PatientList from "../components/patients/PatientList"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"

const PatientsPage = () => {
  const {
    patients,
    loading,
    error,
    fetchPatients
  } = useStore((state) => state.patients) // useShallow to avoid extra renders?

  useEffect(() => {
    fetchPatients()
  }, 
  [])


  
  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading ? <p>loading... </p> : <PatientList patients={patients} />}
      <a className="btn btn--large" 
          href="/appointments/new">Book Your Next Appointment
      </a>
    </>
  )
}
export default PatientsPage