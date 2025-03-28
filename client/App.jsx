import { useState, useEffect } from "react";
import { getPatients } from "./api/patients";


function App() {
  const [loading, setLoading] = useState(false)
  const [patients,setPatients] = useState('')
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patients = await getPatients()
        console.log(patients)
        setPatients(patients)
      } catch(e){
        console.log(e)
      } finally {
      setLoading(false)
      }
    }

    setLoading(true)
    fetchPatients()
  }, 
  [])
  return (
    <div className="App">
      <h1>Patients</h1>
      {loading ? (
        <p>{loading ? 'loading...' : ''}</p>
      ):(
      <div className="patients">
        {patients && patients.length ? patients.map(p => (
          <div className="patient" key={p.id}>
            <h3>{p.name}</h3>
            <img src={p.image} />
          </div>
        )): null}
      </div>
      )}

      <p><a href="#">Book Your Next Appointment</a></p>
    </div>
  );
}

export default App;
