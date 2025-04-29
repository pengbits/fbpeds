import { Button } from "@radix-ui/themes"
const formattedStart = start => {
  let str = start.hours
  str += ':'
  str += `${start.mins}`.length == 1 ? `${start.mins}0` : start.mins
  return str
}

export default ({handleSelectTime,start,providerId}) => {
  return (<Button asChild variant="soft" size="2">
  <a 
    href='#' 
    role="link" 
    onClick={handleSelectTime}
    data-time={formattedStart(start)}
    data-provider-id={providerId}
    className="slot">{formattedStart(start)}
  </a>
  </Button>)
}