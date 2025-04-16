import { useEffect } from "react"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import useStore from "../store/appStore"

const VisitDetailsPage = () => {
  const {
    patient,
    loading,
    error,
  } = useStore((state) => state.patients)

  useEffect(() => {

  }, 
  [])


  
  return (
    <>
      {error && <ErrorMessage error={error} />}
      {loading ? <p>loading... </p> : <p>Ready</p>}
      <div className="visit card">
        <p>Visit Details</p>
      </div>
    </>
  )
}
export default VisitDetailsPage