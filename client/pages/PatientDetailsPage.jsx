import { useParams } from "react-router"
import { useEffect } from "react"
import useStore from "../store/appStore"
import PatientsDetails from "../components/patients/PatientDetails"
import {ErrorMessage} from "../components/errors/ErrorMessage"

const PatientsDetailsPage = () => {

  const {
    patient,
    loading,
    error,
    fetchPatient,
    view,
    setView,
    fetchView,
  } = useStore(state => state.patients)
  
  const params = useParams()

  useEffect(() => {
    fetchPatient(params.id)
  }, [])

  const handleSetView = async (view) => {
    console.log(`Patient.handleSetView ${view}`)
    setView(view) 
    await fetchView(view)
  }
  if(error) { 
    return <ErrorMessage error={error} />
  }

  if(loading){
    return <p>loading...</p>
  }

  return (<>
    <PatientsDetails 
      {...patient}
      setView={handleSetView} 
      view={view}
    />
    <a className="btn btn--large" 
      href={`/appointments/new/patient/${params.id}`}>Book a Visit
    </a>
  </>)
  
}
export default PatientsDetailsPage