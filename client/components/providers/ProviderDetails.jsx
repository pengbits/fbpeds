import { Link as RouterLink } from "react-router"
import { Link, Heading, Text } from "@radix-ui/themes"
const htmlFromMarkDown = (md) => {
  return ['<p>',
    md
      .replace(/\n\-/g, '<br />-')
      .replace(/\n\s\n/g, '</p><p>'),
  '</p>'].join('')
}

export default ({
  id,
  name,
  about,
  medical_degree,
  image
}) => {
  return (
  <div className="user-details">
    <div className="user-details__head">
      {image && <div className="user__image">
        <img src={image} />
      </div>}
      <Heading size='7' as='h2'>{name}</Heading> 
      <Text as='p'>{medical_degree}</Text>
    </div>
    <div className="user-details__head-seperator">
      <span></span>
    </div>
    <div className="user-details__body" dangerouslySetInnerHTML={{
      __html: htmlFromMarkDown(about)}
    }></div>
    <p>
      
    <Link asChild weight='medium' size="3">
      <RouterLink to='/providers'>Back</RouterLink>
    </Link>
    </p>
  </div>)
}