import { useParams } from "react-router"
import { useEffect } from "react"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import ProviderDetails from "../components/providers/ProviderDetails"
import useStore from "../store/appStore"

const ProviderDetailsPage = () => {
  const {
    provider,
    loading,
    error,
    fetchProvider
  } = useStore((state) => state.providers)
  
  const params = useParams()

  useEffect(() => {
    if(params.id) {
      fetchProvider(params.id)
    }
  }, [])

  
  return (
    <>
      <h2>Providers</h2>
      {error && <ErrorMessage error={error} />}
      {loading ? <p>loading... </p> : 
          provider ? <ProviderDetails {...provider} /> : null}
    </>
  )
}
export default ProviderDetailsPage