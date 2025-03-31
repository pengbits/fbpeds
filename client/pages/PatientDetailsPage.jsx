import { useLoaderData } from "react-router"
import PatientsDetails from "../components/PatientDetails"

const PatientsDetailsPage = () => {
  const data = useLoaderData()
  const attrs = data && data.length ? data[0] : {}
  return <PatientsDetails {...attrs} />
}
export default PatientsDetailsPage