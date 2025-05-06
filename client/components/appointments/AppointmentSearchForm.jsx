import { useState } from "react"
import { dateTimePretty, isInFuture } from "../../util/date"
import { Heading, Button } from "@radix-ui/themes"
import { Label } from "radix-ui"
import Select from "@/components/forms/Select"
import DatePicker from "@/components/forms/DatePicker"
import {dateForAppointment} from "../../util/date"

const validation_rules = {
  'patient_id': 'required',
  'visit_type': 'required',
  'date':       (date) => {
    console.log('validate:date', date)
    if(!isInFuture(date)){
      return 'date must be in the future'
    }
  }
}

const validate = (attrs) => {
  let errors = {}
  for(const k in validation_rules){
    const validator = validation_rules[k]
    if(validator == 'required'){
        errors[k] = !attrs[k] ? `${k} is required` : null
    }
    else if(typeof validator == 'function'){
      const error = validator(attrs[k])
      errors[k] = !!error ? error : null
    }
  }
  return errors
}

const errorList = (errors) => (
  Object.values(errors).filter(v => !!v)
)
const hasErrors = (errors) => (errorList(errors).length > 0) 

const AppointmentForm = ({mode, initialAttributes, getAvailability}) => {
  const [attrs, setAttrs] = useState(initialAttributes)
  const [errors, setErrors] = useState({})

  const handleChange = (key, val) => {
    setAttrs({
      ...attrs,
      [key] : val
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const result = validate(attrs)
    if(hasErrors(result)){
      setErrors(result)
    }
    else {
      getAvailability({
        ...attrs,
        date: dateForAppointment(attrs.date)
      })
    }
    
  }

  const child_name_options = [
    {value:'1', label:"Laila Paul"},
    {value:'2', label:"Oskar Paul"},
    {value:'3', label:"Desmond Paul"}
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

  return (<div className="card">
    <Heading as='h4'>{title(attrs)}</Heading>
    {hasErrors(errors) && <div className="error-list">
      <p>There are errors with the following fields: </p>
      <ul>
        {errorList(errors).map(e => <li key={e}>{e}</li>)}
      </ul>
    </div>}
    <form onSubmit={handleSubmit} role="form">
      <p className={errors['patient_id'] ? 'input-error':''}>
        <Label.Root
          className={attrs.patient_id ? 'hidden':''}  
          htmlFor="patient_id">Choose a Child:</Label.Root>
        <Select
          options={child_name_options}
          name='patient_id'
          aria-label="Choose a Child:"
          placeholder="Choose a Child"
          defaultValue={attrs.patient_id}
          onValueChange={val => handleChange('patient_id', val)}
        />
      </p>
      <p className={errors['visit_type'] ? 'input-error':''}>
        <Label.Root className={attrs.visit_type ? 'hidden':''}
          htmlFor="visit_type">Visit Type</Label.Root>
        <Select
          options={visit_type_options}
          name='visit_type'
          defaultValue={attrs.visit_type}
          placeholder='Visit Type'
          onValueChange={val => handleChange('visit_type', val)}
        />
      </p>
      <span className={errors['date'] ? 'input-error':''}>
        <label htmlFor="date">Date</label><br />
        <DatePicker 
          onSelect={val => handleChange('date', val)}
          date={attrs.date}
        />
      </span>
      <Button asChild>
        <input type="submit" value="Search for Times" />
      </Button>
    </form>
  </div>)
}

export default AppointmentForm