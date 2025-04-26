import { Link } from "react-router"
import { useEffect } from 'react'
import useAppStore from '../store/appStore'
import { ErrorMessage } from '../components/errors/ErrorMessage'

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
    <h2>Providers</h2>
    
    {error && <ErrorMessage error={error} />}
    {loading ? (<p>loading...</p>) : (
      <div className="provider-list">
        {(providers || []).map(p => (
        <div data-testid="provider-entry" className="provider" key={p.id}>
          <h3><Link to={`/providers/${p.id}`}>{p.name}</Link></h3>
          {p.image && <div className="provider__image">
            <Link to={`/providers/${p.id}`}>
              <img src={p.image} alt="image of provider" />
            </Link>
          </div>}
        </div>
        ))}
      </div>
    )}
  </div>)
}
export default ProvidersPage