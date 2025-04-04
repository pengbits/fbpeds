import useFetch from "../hooks/useFetch"
import { useParams } from "react-router"
import PatientsDetails from "../components/patients/PatientDetails"
import {ErrorMessage} from "../components/errors/ErrorMessage"

const PatientsDetailsPage = () => {
  const params = useParams()
  const {
    data,
    isLoading,
    isError,
    error
  } = useFetch(`/api/patients/${params.id}`)
  const patient = data && data.length ? data[0] : {}

  return (<>
    {isError && <ErrorMessage error={error} />}
    {isLoading ? <p>loading...</p> : <PatientsDetails {...patient} />}
  </>)
  
}
export default PatientsDetailsPage