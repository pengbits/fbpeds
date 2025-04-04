import useFetch from "../hooks/useFetch"
import PatientList from "../components/patients/PatientList"
import ErrorMessage from "../components/errors/ErrorMessage"

const PatientsPage = () => {
  const {
    data,
    isLoading,
    isError,
    error
  } = useFetch(`/api/patients`)
  return (
    <>
      {isError && <ErrorMessage error={error} />}
      {isLoading ? <p>loading... </p> : <PatientList patients={data} />}
      <a className="btn btn--large" 
          href="/appointments/new">Book Your Next Appointment
      </a>
    </>
  )
}
export default PatientsPage