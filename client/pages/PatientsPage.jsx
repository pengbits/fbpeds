import { useEffect } from "react"
import PatientList from "../components/patients/PatientList"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"
import { Link } from "react-router"
import { Button, Heading, Box} from "@radix-ui/themes"
import PatientListItemSkeleton from "../components/skeletons/PatientListItemSkeleton"
const PatientsPage = () => {
  const {
    patients,
    loading,
    error,
    fetchPatients
  } = useStore((state) => state.patients) // useShallow to avoid extra renders?

  useEffect(() => {
    fetchPatients()
  }, 
  [])

  const Skeletons = () => (<>
    <Box m='2'>
      {[1,2,3].map(i => <PatientListItemSkeleton key={i} appointments={i == 3} />)}
    </Box>
  </>
  )
  
  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading ? <Skeletons /> : <PatientList patients={patients} />}
      <Box className="footer-actions">
        <Button size="3" asChild>
          <Link to="/appointments/new">Book Your Next Appointment</Link>
        </Button>
      </Box>
    </>
  )
}
export default PatientsPage