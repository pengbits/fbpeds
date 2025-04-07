import dayjs from 'dayjs'

const ProviderResult = ({id,name,image}) => {
  return (<div 
    className="provider"
  >
    <h3>{name}</h3>
    <img src={image} alt="image of provider" />
    <div className="provider__availability">
    </div>
  </div>)
}

const AppointmentSearchResults = ({
  visit_type,
  date,
  patient_id,
  providers
}) => {
  const visitPretty = visit_type == 'SICK' ? 'Sick' : 'Well'
  const datePretty = dayjs(date).format('MMM D')
  const headerText = `${visitPretty} Visits in Brooklyn after ${datePretty} with any Provider`
  return (
    <>
      <h2>{headerText}</h2>
      <div data-testid="appointment-providers" className="appointment-providers">
      {providers.map(p => <ProviderResult key={p.id} {...p} />)}
      </div>
    </>

  )
}

export default AppointmentSearchResults