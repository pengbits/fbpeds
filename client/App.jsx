import { Outlet } from "react-router";


import "./App.css"


function App() {
  return (<>
    <header className="header">
      <h1>Flatbush Pediatrics</h1>
    </header>
    <main className="content">
      <Outlet />
    </main>
  </>)
}

export default App;