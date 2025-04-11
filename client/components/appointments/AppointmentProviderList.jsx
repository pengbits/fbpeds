import AppointmentProviderListItem from './AppointmentProviderListItem'

export default ({
  datePretty,
  providers, 
  handleSelectTime
}) => {
  return (<div data-testid="appointment-providers" className="appointment-providers">
    {providers.map((p,idx) => {
      return (
        <AppointmentProviderListItem 
          key={idx}
          datePretty={datePretty}  
          handleSelectTime={handleSelectTime}
          {...p} 
        />)
    })}
  </div>)
}

