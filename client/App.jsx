import { Outlet, useLocation} from "react-router";
import { useEffect } from "react";
import "./App.css"
import "@radix-ui/themes/styles.css";
import Header from "./components/app/header";
import Nav from "./components/app/nav"
import useUser from './hooks/useUser'
import { Theme, Container, Text, Link } from "@radix-ui/themes";
import 'react-loading-skeleton/dist/skeleton.css';
import { getHeaderClassFromLocation } from "./util/classnames";

function App() {
  const {
    user,
    fetchUser,
    clearUser
  } = useUser()
  
  useEffect(() => {
    fetchUser()
  }, [])
  
  const headerClass = getHeaderClassFromLocation(useLocation())
  return (<>
  <Theme 
    panelBackground="solid" 
    radius="large"
    accentColor="crimson">
    <Container size="3" className={`container ${headerClass}`}>
      <Header user={user} logout={clearUser} />
      <Nav />
      {user && <main className="content">
        <Outlet />
      </main>}
      {!user && <Text as='p' className="login-prompt">
        You must log in to access the portal. <Link href="/login">Log in.</Link>
      </Text>}
    </Container>
  </Theme>
  </>)
}

export default App;