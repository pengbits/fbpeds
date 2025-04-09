import { useState } from "react"
import useFetch from "../hooks/useFetch"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import AppointmentSearchResults from "../components/appointments/AppointmentSearchResults"

// .post('/api/appointments')
//   .set('Accept', 'application/json')
//   .send({
//     provider_id: 1,
//     patient_id: 1,
//     datetime: '04-04-2025T10:00'
//   })


const AppointmentSearchPage = () => {
  let [attrs, setAttrs] = useState({})
  let [url,setUrl] = useState(null)
  let [fetchOpts, setFetchOpts] = useState({})
  let [isFetchingAvailability, setIsFetching] = useState(false)
  let [isCreatingAppointment, setIsCreatingAppointment] = useState(false)
  let [view,setView] = useState('form') // form || results
  let isForm = view == 'form'
  const {data,isLoading,isError,error} = useFetch(url, fetchOpts)
  
  const getAvailability = async () => {
    if(!attrs.patient_id || !attrs.visit_type || !attrs.date){
      throw new Error('missing required fields')
    }
    setUrl(`/api/providers/availability/${attrs.date}`)
  }

  const handleSelectTime = (e) => {
    e.preventDefault()
    
    const time        = e.target.getAttribute('data-time')
    const providerId  = e.target.getAttribute('data-provider-id')

    setUrl(`/api/appointments`)
    setFetchOpts({
      method: 'POST',
      body: JSON.stringify({
        provider_id: providerId,
        patient_id: attrs.patient_id,
        datetime: `${attrs.date}T${time}`
      })
    })
    setIsCreatingAppointment(true)
  }

  if(!isFetchingAvailability && isLoading) {
    setIsFetching(true)
  }

  if(isFetchingAvailability && !isLoading) {
    console.log('fetch done, render results')
    setIsFetching(false)
    setView('results')
  }
  if(isCreatingAppointment && isLoading) {
    console.log(`POST ${url}`, fetchOpts)
  
    return <p>loading... </p>
  }

  if(isCreatingAppointment && !isLoading) {
    console.log('success!')
    console.log(data) 
    return <p>Your appointment has been created</p>
  }

  if(isLoading) {
    return <p>loading... </p>
  }

  if(isError){
    return <p style={{border:'red solid 2px', color:'red'}}>{error.message}</p>
  }
  
  else {
    return isForm ? (
      <AppointmentSearchForm
        attrs={attrs}
        setAttrs={setAttrs}
        getAvailability={getAvailability}
      />
    )
    :
    (
      <AppointmentSearchResults
        {...attrs}
        providers={data}
        handleSelectTime={handleSelectTime}
      />
    ) 
  }
}

export default AppointmentSearchPage