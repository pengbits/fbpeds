import { useEffect } from "react"
import PatientList from "../components/patients/PatientList"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import {usePatientStore} from "../store/patients"

const PatientsPage = () => {
  const {
    patients,
    loading,
    error,
    fetchPatients
  } = usePatientStore()

  useEffect(() => {
    fetchPatients()
  }, 
  [])

1
  
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