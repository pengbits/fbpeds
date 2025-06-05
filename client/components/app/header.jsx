import { Link as RouterLink} from "react-router";
import { Box, Heading, Text, Link } from "@radix-ui/themes";

export default ({user,logout}) => {
  return (
  <header className="header">
    <Heading as='h1'>
      <Link asChild>
       <RouterLink to="/" className="home-link">Flatbush Pediatrics</RouterLink>
      </Link>
    </Heading>
    {user && 
      (<Box mt="4" className="user-nav">
        <Text size="2" as='p' className="user__greeting">Hello {user.username}. <Link to="#" onClick={e => logout()}>Log Out.</Link></Text>
      </Box>)}
  </header>
  )
}