import { Link } from "react-router";

export default ({user,logout}) => {
  return (
  <header className="header">
    <h1><Link to="/">Flatbush Pediatrics</Link></h1>
    {user && 
      (<div className="user">
        <p className="user__greeting">Hello {user.username}. <a href="#" onClick={e => logout()}>Log Out.</a></p>
      </div>)}
  </header>
  )
}