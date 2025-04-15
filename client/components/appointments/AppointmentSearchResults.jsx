import { datePretty } from '../../util/date'
import AppointmentProviderList from './AppointmentProviderList'



const AppointmentSearchResults = ({
  visit_type,
  date,
  providers,
  handleSelectTime
}) => {
  const visitPretty = visit_type == 'SICK' ? 'Sick' : 'Well'
  const headerText = `${visitPretty} Visits in Brooklyn after ${datePretty(date)} with any Provider`
  return (
    <>
      <h2>{headerText}</h2>
      <AppointmentProviderList 
        providers={providers} 
        handleSelectTime={handleSelectTime}
      />
    </>

  )
}

export default AppointmentSearchResults