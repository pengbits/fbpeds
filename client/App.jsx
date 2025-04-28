import { Outlet } from "react-router";
import { useState,useEffect } from "react";
import "./App.css"
import "@radix-ui/themes/styles.css";
import Header from "./components/app/header";
import Nav from "./components/app/nav"
import useUser from './hooks/useUser'
import { Theme } from "@radix-ui/themes";

function App() {
  const {
    user,
    fetchUser,
    clearUser
  } = useUser()
  
  useEffect(() => {
    fetchUser()
  }, [])

  return (<>
  <Theme>
    <Header user={user} logout={clearUser} />
    <Nav />
    {user && <main className="content">
      <Outlet />
    </main>}
    {!user && <p>
      You must log in to access the portal. <a href="/login">Log in.</a>
    </p>}
    </Theme>
  </>)
}

export default App;