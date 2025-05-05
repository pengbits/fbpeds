import { useParams, Link } from "react-router"
import { useEffect } from "react"
import useStore from "../store/appStore"
import PatientsDetails from "../components/patients/PatientDetails"
import PatientCharts from "../components/charts/PatientCharts"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import { Heading, Button , Box} from "@radix-ui/themes"

const PatientsDetailsPage = () => {

  const {
    patient,
    loading,
    error,
    view,
    setView,
    fetchView,
    resetView
  } = useStore(state => state.patients)
  
  const {
    generic,
    fetchGenericPercentileChart,
    chart
  } = useStore(state => state.charts)

  const params = useParams()

  useEffect(() => {
    setView('growth');
    fetchView(params.id)
    fetchGenericPercentileChart({
      chart:'height', 
      gender:'female' // TODO make dynamic
    })
    fetchGenericPercentileChart({
      chart:'weight', 
      gender:'female' // TODO make dynamic
    })
    
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
    <Heading as='h2'>Patients</Heading>
    <PatientsDetails 
      {...patient}
      setView={handleSetView} 
      view={view}
    >
      {patient.id && <PatientCharts 
        generic={generic}
        patient={{
          height:chart('height'),
          weight:chart('weight')
        }}
      />}
    </PatientsDetails>
      
    <Box className='footer-actions'>
    <Button size="3" asChild>
      <Link
        to={`/appointments/new/patient/${params.id}`}>Book a Visit
      </Link>
    </Button></Box>
      
  </>)
  
}
export default PatientsDetailsPage