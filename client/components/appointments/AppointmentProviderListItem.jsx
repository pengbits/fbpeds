import ProviderAvailabilityList from '@/components/appointments/ProviderAvailabilityList'
import { Card } from '@radix-ui/themes'
export default ({id,name,image,availability,handleSelectTime}) => {
  return (<Card 
    className="user card"
    data-testid="provider-entry"
  >
    <h3>{name}</h3>
    <div className='user__image'>
      {image && <img src={image} alt="image of provider" />}
    </div>
    <ProviderAvailabilityList
      providerId={id}
      availability={availability}
      handleSelectTime={handleSelectTime} 
    />
  </Card>)
}