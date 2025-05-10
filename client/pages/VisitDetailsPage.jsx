import { useParams } from "react-router"
import { useEffect } from "react"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"
import VisitDetailsCard from "../components/visits/VisitDetailsCard"

const VisitDetailsPage = () => {
  const {
    visit,
    loading,
    error,
    fetchVisit
  } = useStore((state) => state.visits)
  
  const params = useParams()

  useEffect(() => {
    if(params.id && params.visitId) {
      fetchVisit(params)
    }
  }, [])

  
  return (
    <>
      <h2>Patients</h2>
      {error && <ErrorMessage error={error} />}
      {loading ? <p>loading... </p> : 
          visit ? <VisitDetailsCard patientId={params.id} {...visit} /> : null}
    </>
  )
}
export default VisitDetailsPage