import { Outlet } from "react-router";


import "./App.css"

function App() {
  return (
    <div className="app">
      <h1>Flatbush Pediatrics</h1>
      <Outlet />
   </div>
  )
}

export default App;