import { useLoaderData } from "react-router"
const PatientsDetailsPage = () => {
  const patient = useLoaderData()[0]
  return (<div className="patient-details">
    <h2>{patient.name}</h2>
  </div>)
}
export default PatientsDetailsPage