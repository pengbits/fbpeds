import { useLoaderData } from "react-router"
const PatientsDetailsPage = () => {
  const patient = useLoaderData()[0]
  return (<div className="patient-details">
    <h2>{patient.name}</h2>
    <p>{patient.birthdate}</p>
    <div className="patient__image patient__image--large">
      <img src={patient.image} />
    </div>
  </div>)
}
export default PatientsDetailsPage