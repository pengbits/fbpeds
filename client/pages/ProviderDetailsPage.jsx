import { useParams } from "react-router"
import { useEffect } from "react"
import {ErrorMessage} from "../components/errors/ErrorMessage"
import ProviderDetails from "../components/providers/ProviderDetails"
import useStore from "../store/appStore"
import { Heading, Text } from "@radix-ui/themes"
import ProviderDetailsSkeleton from "../components/skeletons/ProviderDetailsSkeleton"

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
      <Heading as='h2'>Providers</Heading>
      {error && <ErrorMessage error={error} />}
      {loading ? <ProviderDetailsSkeleton /> : null}
      {!loading && provider ? <ProviderDetails {...provider} /> : null}
    </>
  )
}
export default ProviderDetailsPage