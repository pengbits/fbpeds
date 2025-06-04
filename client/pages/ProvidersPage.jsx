import { Link as RouterLink } from "react-router"
import { useEffect } from 'react'
import useAppStore from '../store/appStore'
import { ErrorMessage } from '../components/errors/ErrorMessage'
import ProviderListItem from "../components/providers/ProviderListItem"
import ProviderListItemSkeleton from "../components/skeletons/PatientListItemSkeleton"
import { Heading } from "@radix-ui/themes"
import Skeleton from "react-loading-skeleton"
const ProvidersPage = () => {
  const {
    providers,
    fetchProviders,
    loading,
    error
  } = useAppStore(state => state.providers)
  
  useEffect(() => {
    fetchProviders()
  },[])

  const Skeletons = () => {
    const items = [1,2,3,4]
    return items.map(i  => <ProviderListItemSkeleton key={i} />)
  }
  
  return (<div className="providers">
    {error && <ErrorMessage error={error} />}
    {loading ? <Skeletons /> : (
      <div className="provider-list">
        {providers.map(attrs => <ProviderListItem key={attrs.id} {...attrs} />)}
      </div>)
    }
  </div>)
}
export default ProvidersPage