
const AppointmentForm = ({attrs,setAttrs,getAvailability}) => {
 
  const handleChange = (e) => {
    setAttrs(attrs => ({
      ...attrs,
      [e.target.id] : e.target.value
    }))
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
  

  return (<div className="appointment-search">
    <h3>New Appointment</h3>
    <form onSubmit={handleSubmit} role="form">
      <p>
      <label htmlFor="patient_id">Choose a Child</label><br />
      <select id="patient_id" value={attrs.patient_id} onChange={handleChange}>
        <option>Select a Child:</option>
        {child_name_options.map(c => (
          <option key={c.id} value={c.id}> {c.name}</option>
        ))}
      </select>
      </p>
       <p>
      <label htmlFor="visit_type">Visit Type</label><br />
      <select id="visit_type" value={attrs.visit_type} onChange={handleChange}>
        <option>Select visit Type:</option>
        {visit_type_options.map(t => (
          <option key={t.value} value={t.value}>{t.label}</option>
        ))}
      </select>
      </p>
      <p>
        <label htmlFor="date">Date</label><br />
        <input type="date" id="date" onChange={handleChange} />
      </p>
      <input type="submit" value="Search" />
    </form>
  </div>)
}

export default AppointmentForm