import { NavLink } from "react-router"

const PatientLink = ({id,children}) => (
  <NavLink to={`/patients/${id}`}>
    {children}
  </NavLink>
)

export default PatientLink