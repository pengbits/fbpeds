import { useState,  } from "react"
import { useParams } from "react-router"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import AppointmentSearchResults from "../components/appointments/AppointmentSearchResults"
import useStore from "../store/appStore"

// .post('/api/appointments')
//   .set('Accept', 'application/json')
//   .send({
//     provider_id: 1,
//     patient_id: 1,
//     datetime: '04-04-2025T10:00'
//   })


const AppointmentSearchPage = () => {
  const {
    loading, 
    error,
    appointment,
    setAppointment,
    fetchProviderAvailability,
    fetchingAvailability,
    providersWithAvailability
    } = useStore(state => state.appointments)

  const {patientId} = useParams()
  // this is unsetting form state
  const initialAttributes =  patientId ? {patient_id:patientId} : {}
  const isForm = !fetchingAvailability

  const getAvailability = async (attrs) => {
    setAppointment(attrs)
    await fetchProviderAvailability()
  }

  const handleSelectTime = (e) => {
    e.preventDefault()
    
    const time        = e.target.getAttribute('data-time')
    const providerId  = e.target.getAttribute('data-provider-id')

    console.log(`fetch /api/appointments`, {
      method: 'POST',
      body: JSON.stringify({
        provider_id: providerId,
        patient_id: appointment.patient_id,
        datetime: `${appointment.date}T${time}`
      })
    })
  }

  console.log('render', {fetchingAvailability, providersWithAvailability, appointment})

  if(loading) {
    return <p>loading... </p>
  }

  if(error){
    return <p style={{border:'red solid 2px', color:'red'}}>{error.message}</p>
  }
  
  else {
    return isForm ? (
      <AppointmentSearchForm
        initialAttributes={initialAttributes}
        getAvailability={getAvailability}
      />
    )
    :
    (
      <AppointmentSearchResults
        providers={providersWithAvailability}
        handleSelectTime={handleSelectTime}
      />
    ) 
  }
}

export default AppointmentSearchPage