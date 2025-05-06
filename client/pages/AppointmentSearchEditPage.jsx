import { useEffect } from "react"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import useStore from "../store/appStore"
import { Box } from "@radix-ui/themes"

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
      initialAttributes={{
        ...appointment,
        patient_id: `${appointment.patient_id}`,
        date: appointment.datetime
      }}
      getAvailability={getAvailability}
    />)
  } else {
    return (
      <Box className="success">
        <p>Your appointment has been updated. <a href="/patients">Home</a></p>
      </Box>
    )
  }
}
export default AppointmentSearchEditPage