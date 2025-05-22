import { Link, useLocation } from "react-router"
import { TabNav, Box } from "@radix-ui/themes"
export default () => {
  const {pathname}  = useLocation()
  const isPatients  = (pathname.indexOf('/patients') > -1)
  const isProviders = (pathname.indexOf('/providers') > -1)
  
  return (<Box className='header-nav' pb='3'>
    <TabNav.Root>
      <TabNav.Link active={isPatients } asChild><Link to="/patients">Patient Portal</Link></TabNav.Link>
      <TabNav.Link active={isProviders} asChild><Link to="/providers">Providers</Link></TabNav.Link>
    </TabNav.Root>
  </Box>)
}