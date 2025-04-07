import { useState } from "react"
import useFetch from "../hooks/useFetch"
import AppointmentSearchForm from "../components/appointments/AppointmentSearchForm"
import AppointmentSearchResults from "../components/appointments/AppointmentSearchResults"


const AppointmentSearchPage = () => {
  let [url,setUrl] = useState(null)
  let [isFetching, setIsFetching] = useState(false)
  let [view,setView] = useState('form') // form || results
  const {data,isLoading,isError} = useFetch(url)
  
  const getAvailability = async (attrs) => {
    if(!attrs.child_id || !attrs.visit_type || !attrs.date){
      throw new Error('missing required fields')
    }
    console.log('getAvailability '+attrs.date)
    setUrl(`/api/providers/availability/${attrs.date}`)
  }

  if(!isFetching && isLoading) {
    console.log('fetch availability')
    setIsFetching(true)
  }
  if(isFetching && !isLoading) {
    console.log('fetch done, render results')
    setIsFetching(false)
    setView('results')
  }
  const isForm = view == 'form'

  if(isLoading) {
    return <p>loading... </p>
  }
  else {
    return isForm ? (
      <AppointmentSearchForm 
        getAvailability={getAvailability}
      />
    )
    :
    (
      <AppointmentSearchResults data={data} />
    ) 
  }
}

export default AppointmentSearchPage