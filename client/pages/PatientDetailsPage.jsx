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
    view,
    setView,
    fetchView,
    fetchPatient,
    resetView
  } = useStore(state => state.patients)
  
  const params = useParams()

  useEffect(() => {
    setView('growth');
    fetchView(params.id)
    // fetchPatient(params.id)
    return () => {
      resetView()
    }
  }, [])

  const handleSetView = async (view) => {
    setView(view) 
    await fetchView()
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