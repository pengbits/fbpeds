import { useState, useEffect } from "react"
import { useParams } from "react-router"
import PatientsDetails from "../features/patients/PatientDetails"
import {getPatient} from "../api/patients"

const PatientsDetailsPage = () => {
  const [loading,setIsLoading] = useState(false)
  const [patient, setPatient] = useState({})
  const params = useParams()

  const fetchPatients = async () => {
    try {
      setIsLoading(true)
      const [data] = await getPatient(params.id)
      setPatient(data)
    } catch(e){
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  },[])

  return (<>
    {loading ? <p>loading...</p> : <PatientsDetails {...patient} />}
  </>)
  
}
export default PatientsDetailsPage