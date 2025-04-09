import ProviderAvailabilityList from '@/components/appointments/ProviderAvailabilityList'

export default ({id,name,image,availability,handleSelectTime}) => {
  return (<div 
    className="provider"
    data-testid="provider-entry"
  >
    <h3>{name}</h3>
    <div className='provider__image'>
      {image && <img src={image} alt="image of provider" />}
    </div>
    <ProviderAvailabilityList
      providerId={id}
      availability={availability}
      handleSelectTime={handleSelectTime} 
    />
  </div>)
}