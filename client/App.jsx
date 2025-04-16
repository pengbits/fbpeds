import { Outlet } from "react-router";
import { Link } from "react-router";

import "./App.css"


function App() {
  return (<>
    <header className="header">
      <h1><Link to="/">Flatbush Pediatrics</Link></h1>
    </header>
    <main className="content">
      <Outlet />
    </main>
  </>)
}

export default App;