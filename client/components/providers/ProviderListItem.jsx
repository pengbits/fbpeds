import { Link as RouterLink } from "react-router"
import { Box, Flex, Link, Card } from "@radix-ui/themes"

export default  ({id,image,name}) => (
<Box data-testid="provider-entry" key={id} className="provider card">
  <Flex>
    {image && <div className="user__image">
      <RouterLink to={`/providers/${id}`}>
        <img src={image} alt="image of provider" />
      </RouterLink>
    </div>}
    <div className="provider__actions">
      <Link  color='gray' asChild weight='medium' size='5' asChild>
        <RouterLink to={`/providers/${id}`}>{name}</RouterLink>
      </Link>
    </div>
    </Flex>
</Box>)