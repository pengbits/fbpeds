import { useState } from "react"
import { dateTimePretty } from "../../util/date"
import { Heading, Button } from "@radix-ui/themes"
import { Label } from "radix-ui"
import Select from "@/components/forms/Select"
import DatePicker from "@/components/forms/DatePicker"
import {dateForAppointment} from "../../util/date"

const AppointmentForm = ({mode, initialAttributes, getAvailability}) => {
  const [attrs, setAttrs] = useState(initialAttributes)

  const handleChange = (e) => {
    setAttrs({
      ...attrs,
      [e.target.id] : e.target.value
    })
  }

  const handleChangePatient = (id) => {
    setAttrs({
      ...attrs,
      'patient_id':id
    })
  }

  const handleChangeVisitType = (type)=> {
    setAttrs({
      ...attrs,
      'visit_type':type
    })
  }
  const handleChangeDatetime = (datetime, triggerDate, modifiers, e) => {
    setAttrs({
      ...attrs,
      'date':datetime
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    getAvailability({
      ...attrs,
      date: dateForAppointment(attrs.date)
    })
  }

  const child_name_options = [
    {value:1, label:"Laila Paul"},
    {value:2, label:"Oskar Paul"},
    {value:3, label:"Desmond Paul"}
  ]

  const visit_type_options = [
    {value:"WELL", label:'Well Visit'},
    {value:"SICK", label:'Sick Visit'}
  ]

  const title = (attrs) => {
    if(!attrs.datetime) {
      return 'New Appointment'
    }

    return `Reschedule Appointment on ${dateTimePretty(attrs.datetime)} with  ${attrs.provider_name}`
  }
  const initialPatientId = attrs.patient_id ? {defaultValue:attrs.patient_id} : {}
  const initialVisitType = attrs.visit_type ? {defaultValue:attrs.visit_type} : {}

  return (<div className="card">
    <Heading as='h4'>{title(attrs)}</Heading>
    <form onSubmit={handleSubmit} role="form">
      <p>
        <Label.Root className={attrs.patient_id ? 'hidden':''}
          htmlFor="patient_id">Choose a Child:</Label.Root>
        <Select
          options={child_name_options}
          name='patient_id'
          aria-label="Choose a Child:"
          initialAttrs={initialPatientId}
          placeholder='Choose a Child'
          onValueChange={handleChangePatient}
        />
      </p>
       <p>
        <Label.Root className={attrs.visit_type ? 'hidden':''}
          htmlFor="visit_type">Visit Type</Label.Root>
        <Select
          options={visit_type_options}
          name='visit_type'
          initialAttrs={initialVisitType}
          placeholder='Visit Type'
          onValueChange={handleChangeVisitType}
        />
      </p>

      <label htmlFor="date">Date</label><br />
      <DatePicker 
        onSelect={handleChangeDatetime}
        date={attrs.date}
      />
       
      <Button asChild>
        <input type="submit" value="Search for Times" />
      </Button>
    </form>
  </div>)
}

export default AppointmentForm