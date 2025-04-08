import AppointmentProviderListItem from './AppointmentProviderListItem'

export default ({providers, datePretty}) => {
  return (<div data-testid="appointment-providers" className="appointment-providers">
    {providers.map(p => <AppointmentProviderListItem key={p.id} {...p} datePretty={datePretty} />)}
  </div>)
}

