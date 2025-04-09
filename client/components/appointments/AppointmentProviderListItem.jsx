import dayjs from "dayjs"
const formattedStart = start => {
  let str = start.hours
  str += ':'
  str += `${start.mins}`.length == 1 ? `${start.mins}0` : start.mins
  return str
}
export default ({id,name,image,availability,handleSelectTime}) => {
  return (<div 
    className="provider"
    data-testid="provider-entry"
  >
    <h3>{name}</h3>
    <div className='provider__image'>
      {image && <img src={image} alt="image of provider" />}
    </div>
    
    {availability.map(({date,slots}) => (<div key={date} 
      data-testid="provider-availability" 
      className="availability">
        <div className="availability__date">
          {dayjs(date).format('MMM D')} 
        </div>
        <div className="availability__slots">
          {slots.map(({start},i) => {
            return (<a 
              href='#' 
              role="link" 
              key={i} 
              onClick={handleSelectTime}
              data-time={formattedStart(start)}
              data-provider-id={id}
              className="slot">{formattedStart(start)}</a>
            )
          })}
        </div>
    </div>))}
  </div>)
}