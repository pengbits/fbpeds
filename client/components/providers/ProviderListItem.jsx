import { Link as RouterLink } from "react-router"
import { Link, Card } from "@radix-ui/themes"

export default  ({id,image,name}) => (
<Card data-testid="provider-entry" className="provider card" key={id}>
  <Link size='5' asChild>
    <RouterLink to={`/providers/${id}`}>{name}</RouterLink>
  </Link>
  {image && <div className="provider__image">
    <RouterLink to={`/providers/${id}`}>
      <img src={image} alt="image of provider" />
    </RouterLink>
  </div>}
</Card>)