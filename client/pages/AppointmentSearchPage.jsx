import { useParams } from "react-router"

import AppointmentSearchResults from "../components/appointments/AppointmentSearchResults"
import AppointmentSearchCreatePage from "./AppointmentSearchCreatePage"
import AppointmentSearchEditPage from "./AppointmentSearchEditPage"
import useStore from "../store/appStore"
import AppointmentSearchResultSkeleton from "../components/skeletons/AppointmentSearchResultSkeleton"



const AppointmentSearchPage = () => {

  const {
    loading, 
    error,
    appointment,
    setAppointment,
    fetchProviderAvailability,
    fetchingAvailability,
    providersWithAvailability,
    createAppointment,
    updateAppointment
    } = useStore(state => state.appointments)

  const {patientId,appointmentId} = useParams()
  let initialAttributes = {}
  initialAttributes.patient_id     = patientId ? Number(patientId) : ''
  initialAttributes.appointment_id = appointmentId ? appointmentId : null

  const getAvailability = async (attrs) => {
    // console.log('getAvailability', attrs)
    setAppointment(attrs)
    await fetchProviderAvailability()
  }

  // need to know if we are creating or updating here
  const handleSelectTime = async (e, onSelectTime) => {
    e.preventDefault()
    
    const time        = e.target.getAttribute('data-time')
    const providerId  = e.target.getAttribute('data-provider-id')
    let attrs = {
      provider_id: providerId,
      patient_id: appointment.patient_id,
      visit_type: appointment.visit_type,
      datetime: `${appointment.date}T${time}`
    }
    if(!appointmentId){
      await createAppointment(attrs)
    } else {
      await updateAppointment({appointment_id: appointmentId, ...attrs})
    }
  }


  if(fetchingAvailability && loading ) {
    const items = new Array(4).fill(1).map((_,i) => i)
    return items.map(i => <AppointmentSearchResultSkeleton key={i} />)
  }
  else if(fetchingAvailability){
    return (
      <AppointmentSearchResults
        providers={providersWithAvailability}
        handleSelectTime={handleSelectTime}
        {...appointment}
      />
    )
  } else if(error){
    return <p style={{border:'red solid 2px', color:'red'}}>{error.message}</p>
  } else if(appointmentId) {
    return (
      <AppointmentSearchEditPage
        initialAttributes={initialAttributes}
        getAvailability={getAvailability}
      />
    )
  } else {
    return (
      <AppointmentSearchCreatePage
        initialAttributes={initialAttributes}
        getAvailability={getAvailability}
      />
    )
  }

}

export default AppointmentSearchPage