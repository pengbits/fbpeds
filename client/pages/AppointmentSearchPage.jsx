import { useParams, useNavigate } from "react-router"
import { useEffect } from "react"
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
  const navigate = useNavigate()

  const {
    loading, 
    error,
    appointment,
    setAppointment,
    fetchProviderAvailability,
    fetchingAvailability,
    providersWithAvailability,
    fetchAppointment,
    fetchingAppointment,
    createAppointment,
    creatingAppointment,
    updateAppointment,
    updatingAppointment
    } = useStore(state => state.appointments)

  const {patientId,appointmentId} = useParams()
  let initialAttributes = {}
  let isForm
  
  if(patientId)     initialAttributes.patient_id = patientId
  if(appointmentId) initialAttributes.appointment_id = appointmentId
  
  const shouldUpdate= !!appointmentId
  const shouldCreate= !shouldUpdate

  const getAvailability = async (attrs) => {
    // console.log('getAvailability', attrs)
    setAppointment(attrs)
    await fetchProviderAvailability()
  }

  // need to know if we are creating or updating here
  const handleSelectTime = async (e) => {
    e.preventDefault()
    
    const time        = e.target.getAttribute('data-time')
    const providerId  = e.target.getAttribute('data-provider-id')
    let attrs         = {
      provider_id: providerId,
      patient_id: appointment.patient_id,
      visit_type: appointment.visit_type,
      datetime: `${appointment.date}T${time}`
    }
    if(shouldUpdate) attrs.appointment_id = appointmentId
    const operation = shouldCreate ? createAppointment : updateAppointment
    await operation(attrs)
  }

  useEffect(() => {
    if(!loading && !fetchingAppointment && shouldUpdate){
      console.log(`useEffect => fetchAppt()`)
      fetchAppointment(appointmentId)
    }
  },[loading,fetchingAppointment,shouldUpdate])
  
  if(!fetchingAvailability && !creatingAppointment && !updatingAppointment){
    isForm = true
  }

  // console.log('render', {
  //   loading,
  //   error,
  //   isForm,
  //   fetchingAppointment
  // })
  if(loading) {
    return <p>loading... </p>
  }
  
  if(error){
    return <p style={{border:'red solid 2px', color:'red'}}>{error.message}</p>
  }

  if(!loading && !fetchingAppointment && shouldUpdate ) {
    
  }

  if(!loading && creatingAppointment && shouldCreate){
    // return navigate('/patients')
    return <p>Your appointment has been created. <a href="/patients">Home</a></p>
  }

  if(!loading && updatingAppointment){
    return <p>Your appointment has been updated. <a href="/patients">Home</a></p>
  }

  // TODO split this form into two components for edit/create

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
        {...appointment}
        handleSelectTime={handleSelectTime}
      />
    ) 
  }
}

export default AppointmentSearchPage