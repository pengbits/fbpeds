import { useState } from "react"
import { dateTimePretty } from "../../util/date"
import { Heading, Select } from "@radix-ui/themes"

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

  const handleSubmit = (e) => {
    e.preventDefault()
    getAvailability(attrs)
  }

  const child_name_options = [
    {id:"1", name:"Laila Paul"},
    {id:"2", name:"Oskar Paul"},
    {id:"3", name:"Desmond Paul"}
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
        <Select.Root size="3" {...initialPatientId}
          onValueChange={handleChangePatient}>
          <Select.Trigger placeholder="Choose a Child" />
          <Select.Content>
            {child_name_options.map(c => (
              <Select.Item key={c.id} value={c.id}> {c.name}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </p>
       <p>
        <Select.Root size="3" {...initialVisitType}
          onValueChange={handleChangeVisitType}>
          <Select.Trigger placeholder="Visit Type" />
          <Select.Content>
            {visit_type_options.map(t => (
              <Select.Item key={t.value} value={t.value}> {t.label}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </p>
      <p>
        <label htmlFor="date">Date</label><br />
        <input type="date" id="date" value={attrs.datetime} onChange={handleChange} />
      </p>
      <input type="submit" value="Search" />
    </form>
  </div>)
}

export default AppointmentForm