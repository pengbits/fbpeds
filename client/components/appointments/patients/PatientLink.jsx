import { Link } from "react-router"

const PatientLink = ({id,children}) => (
  <Link to={`/patients/${id}`}>
    {children}
  </Link>
)

export default PatientLink