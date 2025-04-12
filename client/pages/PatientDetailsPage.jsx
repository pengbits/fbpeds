import { useParams } from "react-router"
import { useEffect } from "react"
import {usePatientStore} from "../store/patients"
import PatientsDetails from "../components/patients/PatientDetails"
import {ErrorMessage} from "../components/errors/ErrorMessage"

const PatientsDetailsPage = () => {

const {
    patients,
    loading,
    error,
    fetchPatient
  } = usePatientStore()
  
  const params = useParams()

  useEffect(() => {
    fetchPatient(params.id)
  }, [])

  const patient = patients.length ? patients[0] : {}
  return (<>
    {error && <ErrorMessage error={error} />}
    {loading ? <p>loading...</p> : <PatientsDetails {...patient} />}
  </>)
  
}
export default PatientsDetailsPage