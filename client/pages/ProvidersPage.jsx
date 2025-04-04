import useFetch from '../hooks/useFetch'
import { ErrorMessage } from '../components/errors/ErrorMessage'
const ProvidersPage = () => {
  const {data,isLoading,isError,error} = useFetch(`/api/providers`)
  return (<div className="providers">
    <h2>Providers</h2>
    {isError && <ErrorMessage error={error} />}
    {isLoading ? (<p>loading...</p>) : (
      <div className="provider-list">
        {(data || []).map(p => (
        <div data-testid="provider-entry" className="provider" key={p.id}>
          <h3>{p.name}</h3>
          {p.image && <div className="provider__image">
            <img src={p.image} alt="image of provider" />
          </div>}
        </div>
        ))}
      </div>
    )}
  </div>)
}
export default ProvidersPage