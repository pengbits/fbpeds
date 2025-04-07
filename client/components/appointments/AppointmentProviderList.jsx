import AppointmentProviderListItem from './AppointmentProviderListItem'

export default ({providers}) => {
  return (<div data-testid="appointment-providers" className="appointment-providers">
    {providers.map(p => <AppointmentProviderListItem key={p.id} {...p} />)}
  </div>)
}

