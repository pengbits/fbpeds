import { useState, useEffect } from "react";



function App() {
  const [loading, setLoading] = useState(false)
  const [greeting,setGreeting] = useState('')
  useEffect(() => {
    const fetchGreeting = async () => {
      const res  = await fetch('/api')
      const {greeting} = await res.json()
      
      setGreeting(greeting)
      setLoading(false)
    }

    setLoading(true)
    fetchGreeting()
  }, 
  [])
  return (
    <div className="App">
      <h1>{loading ? 'Hello' : greeting}</h1>
      <p>{loading ? 'loading...' : ''}</p>
    </div>
  );
}

export default App;
