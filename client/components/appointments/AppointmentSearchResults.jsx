import dayjs from 'dayjs'
import AppointmentProviderList from './AppointmentProviderList'

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
      <AppointmentProviderList providers={providers} />
    </>

  )
}

export default AppointmentSearchResults