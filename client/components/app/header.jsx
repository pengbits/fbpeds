import { Link as RouterLink} from "react-router";
import { Box, Heading, Text, Link } from "@radix-ui/themes";

export default ({user,logout}) => {
  return (
  <header className="header">
    <Heading as='h1'>
      <Link asChild>
       <RouterLink to="/">Flatbush Pediatrics</RouterLink>
      </Link>
    </Heading>
    {user && 
      (<Box mt="4" className="user">
        <Text size="2" as='p' className="user__greeting">Hello {user.username}. <a href="#" onClick={e => logout()}>Log Out.</a></Text>
      </Box>)}
  </header>
  )
}