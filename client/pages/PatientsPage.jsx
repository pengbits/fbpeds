import PatientList from "../features/patients/PatientList"
import { useState, useEffect } from "react"
import {getPatients} from "../api/patients"

const PatientsPage = () => {
  const [loading,setIsLoading] = useState(false)
  const [patients, setPatients] = useState([])

  const fetchPatients = async () => {
    try {
      setIsLoading(true)
      const data = await getPatients()
      setPatients(data)
    } catch(e){
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  },[])
  
  const attrs = {patients}

  return (
    <>
      {loading ? <p>loading... </p> : <PatientList {...attrs} />}
      <a className="btn btn--large" 
          href="/appointments/new">Book Your Next Appointment
      </a>
    </>
  )
}
export default PatientsPage