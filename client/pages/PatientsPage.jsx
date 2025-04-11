import useFetch from "../hooks/useFetch"
import { useState, useEffect } from "react"
import PatientList from "../components/patients/PatientList"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import {usePatientStore} from "../store/patients"

const PatientsPage = () => {
  const {
    patients,
    loading,
    fetchPatients
  } = usePatientStore()

  useEffect(() => {
    fetchPatients()
  }, 
  [])

1
  
  return (
    <>
      {loading ? <p>loading...</p> : <p>Ahoy</p>}
      <p>{patients.map(p => {
        return `${p}, `
      })}</p>
    </>
  )
}
export default PatientsPage