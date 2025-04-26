import { Link, useLocation } from "react-router"

export default () => {
  const {pathname}  = useLocation()
  const isPatients  = (pathname.indexOf('/patients') > -1)
  const isProviders = (pathname.indexOf('/providers') > -1)
  
  return (
    <nav className="nav">
      <ul>
        <li className={isPatients ? 'active':''}><Link to="/patients">Patient Portal</Link></li>
        <li className={isProviders ? 'active':''}><Link to="/providers">Providers</Link></li>
      </ul>
    </nav>
  )
}