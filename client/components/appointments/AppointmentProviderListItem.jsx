export default ({id,name,image}) => {
  return (<div 
    className="provider"
    data-testid="provider-entry"
  >
    <h3>{name}</h3>
    <div className='provider__image'>
      {image && <img src={image} alt="image of provider" />}
    </div>

    <div className="provider__availability"></div>
  </div>)
}