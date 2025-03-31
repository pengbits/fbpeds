import { useLoaderData, NavLink } from "react-router"

const PatientLink = ({id,children}) => (
  <NavLink to={`/patients/${id}`}>
    {children}
  </NavLink>
)

const PatientsPage = () => {
  const {patients} = useLoaderData()

  return (<div className="patients">
    <h2>Patients</h2>
    {patients && patients.map(({name,image,id}) => (
      <div key={id} className="patient">
        <h3>
          <PatientLink id={id}>
          {name}
          </PatientLink>
        </h3>
        <div className="patient__image">
          <PatientLink id={id}>
            <img src={image} />
          </PatientLink>
        </div>
      </div>
    ))}
  </div>)
}
export default PatientsPage