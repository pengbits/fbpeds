import useFetch from '../hooks/useFetch'

const ProvidersPage = () => {
  const {data,isLoading,isError,error} = useFetch(`/api/providers`)
  return (<div className="providers">
    <h2>Providers</h2>
    {isError && <div className="error" data-testid="error-message">
      <h4>An Error occurred</h4>
      <p>{error.message}</p>
    </div>}
    {isLoading ? (<p>loading...</p>) : (
      <div className="provider-list">
        {(data || []).map(p => (
        <div data-testid="provider-entry" className="provider" key={p.id}>
          <h3>{p.name}</h3>
        </div>
        ))}
      </div>
    )}
  </div>)
}
export default ProvidersPage