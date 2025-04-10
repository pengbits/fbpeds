import dayjs from 'dayjs'
import AppointmentProviderList from './AppointmentProviderList'



const AppointmentSearchResults = ({
  visit_type,
  date,
  providers,
  handleSelectTime
}) => {
  const visitPretty = visit_type == 'SICK' ? 'Sick' : 'Well'
  const datePretty = dayjs(date).format('MMM D')
  const headerText = `${visitPretty} Visits in Brooklyn after ${datePretty} with any Provider`
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