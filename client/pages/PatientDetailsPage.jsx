import { useParams } from "react-router"
import { useEffect } from "react"
import useStore from "../store/appStore"
import PatientsDetails from "../components/patients/PatientDetails"
import {ErrorMessage} from "../components/errors/ErrorMessage"

const PatientsDetailsPage = () => {

  const {
    patients,
    loading,
    error,
    fetchPatient
  } = useStore(state => state.patients)
  
  const params = useParams()

  useEffect(() => {
    fetchPatient(params.id)
  }, [])

  const patient = patients.length ? patients[0] : {}
  return (<>
    {error && <ErrorMessage error={error} />}
    {loading ? <p>loading...</p> : <PatientsDetails {...patient} />}
     <a className="btn btn--large" 
        href={`/appointments/new/patient/${params.id}`}>Book a Visit
    </a>
  </>)
  
}
export default PatientsDetailsPage