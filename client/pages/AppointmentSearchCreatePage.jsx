import { useParams } from "react-router"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import useStore from "../store/appStore"

const AppointmentSearchCreatePage = ({initialAttributes,getAvailability}) => {
  const {
    fetchingAvailability,
    creatingAppointment
  } = useStore(state => state.appointments)
  // console.log('Page', initialAttributes)
  if(!fetchingAvailability && !creatingAppointment){
    return (<AppointmentSearchForm
      initialAttributes={initialAttributes}
      getAvailability={getAvailability}
    />)
  } else {
    return (
      <p>Your appointment has been created. <a href="/patients">Home</a></p>
    )
  }
}
export default AppointmentSearchCreatePage