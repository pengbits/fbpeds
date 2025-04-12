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
    } = useStore(state => state.appointments)

  const {patientId} = useParams()
  const initialAttributes =  patientId ? {patient_id:patientId} : {}
  const isForm = true

  const getAvailability = async (attrs) => {
    console.log(attrs)
    // if(!appointment.patient_id || !appointment.visit_type || !appointment.date){
    //   throw new Error('missing required fields')
    // }
    console.log(`fetch /api/providers/availability/${attrs.date}`)
  }

  const handleSelectTime = (e) => {
    e.preventDefault()
    
    const time        = e.target.getAttribute('data-time')
    const providerId  = e.target.getAttribute('data-provider-id')

    console.log(`fetch /api/appointments`, {
      method: 'POST',
      body: JSON.stringify({
        provider_id: providerId,
        patient_id: attrs.patient_id,
        datetime: `${attrs.date}T${time}`
      })
    })
  }

 
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
        {...attrs}
        providers={[]}
        handleSelectTime={handleSelectTime}
      />
    ) 
  }
}

export default AppointmentSearchPage