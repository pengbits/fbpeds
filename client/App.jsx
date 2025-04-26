import { Outlet } from "react-router";
import { useState,useEffect } from "react";
import "./App.css"
import Header from "./components/app/header";

function App() {
  const [user, setUser] = useState(null)
  
  const syncUser = async (url) => {
    const res = await fetch(url)
    const {user} = await res.json()
    setUser(user)
  }
  
  const fetchUser = () => {
    syncUser('/user')
  }
  const clearUser = () => {
    syncUser('/logout-user')
  }

  useEffect(() => {
    fetchUser()
    console.log()
  }, [])
  
  const handleLogout = () => {
    clearUser()
  }

  return (<>
    <Header user={user} logout={handleLogout} />
    {user && <main className="content">
      <Outlet />
    </main>}
    {!user && <p>
      You must log in to access the portal. <a href="/login">Log in.</a>
    </p>}
  </>)
}

export default App;