import { useParams } from "react-router"
import { useEffect } from "react"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import useStore from "../store/appStore"

const AppointmentSearchEditPage = ({initialAttributes,getAvailability}) => {
  const {
    appointment_id
  } = initialAttributes
  const {
    loading,
    appointment,
    updatingAppointment,
    fetchAppointment,
    fetchingAppointment
  } = useStore(state => state.appointments)
  
  const getAppointment = async (id) => {
    await fetchAppointment(id)
  }
  
  useEffect(() => {
    !loading && !fetchingAppointment && !updatingAppointment && getAppointment(appointment_id)
  },[])

  if(!loading && !updatingAppointment && fetchingAppointment){
    return (<AppointmentSearchForm 
      initialAttributes={appointment}
      getAvailability={getAvailability}
    />)
  } else {
    return (
      <p>Your appointment has been updated. <a href="/patients">Home</a></p>
    )
  }
}
export default AppointmentSearchEditPage