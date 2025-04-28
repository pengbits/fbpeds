import { useEffect } from "react"
import PatientList from "../components/patients/PatientList"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"
import { Button } from "@radix-ui/themes"

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
      <h2>Patients</h2>
      {error && <ErrorMessage error={error} />}
      {loading ? <p>loading... </p> : <PatientList patients={patients} />}
      <Button asChild>
        <a href="/appointments/new">Book Your Next Appointment</a>
      </Button>
    </>
  )
}
export default PatientsPage