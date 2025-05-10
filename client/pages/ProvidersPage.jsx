import { Link as RouterLink } from "react-router"
import { useEffect } from 'react'
import useAppStore from '../store/appStore'
import { ErrorMessage } from '../components/errors/ErrorMessage'
import { Heading, Link, Card } from "@radix-ui/themes"
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
  
  return (<div className="providers">
    <Heading as='h2'>Providers</Heading>
    
    {error && <ErrorMessage error={error} />}
    {loading ? (<p>loading...</p>) : (
      <div className="provider-list">
        {(providers || []).map(p => (
        <Card data-testid="provider-entry" className="provider card" key={p.id}>
          <Link size='5' asChild>
            <RouterLink to={`/providers/${p.id}`}>{p.name}</RouterLink>
          </Link>
          {p.image && <div className="provider__image">
            <RouterLink to={`/providers/${p.id}`}>
              <img src={p.image} alt="image of provider" />
            </RouterLink>
          </div>}
        </Card>
        ))}
      </div>
    )}
  </div>)
}
export default ProvidersPage