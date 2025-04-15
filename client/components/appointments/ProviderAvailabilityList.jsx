import ProviderAvailabilityListItem from '@/components/appointments/ProviderAvailabilityListItem'
import { datePretty } from '../../util/date'

const formattedStart = start => {
  let str = start.hours
  str += ':'
  str += `${start.mins}`.length == 1 ? `${start.mins}0` : start.mins
  return str
}
export default ({
  availability,
  providerId,
  handleSelectTime
}) => (availability.map(({date,slots}) => (<div key={date} 
  data-testid="provider-availability" 
  className="availability">
    <div className="availability__date">
      {datePretty(date)} 
    </div>
    <div className="availability__slots">
      {slots.map(({start},i) => {
        return (<ProviderAvailabilityListItem 
          providerId={providerId}
          handleSelectTime={handleSelectTime}
          start={start} key={i} 
        />)
      })}
    </div>
</div>)))