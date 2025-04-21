import { datePretty } from "../../util/date"

export default ({
  visit_type,
  visit_date,
  provider_name,
  image,
  weight,
  height
}) => {
  const visitTypePretty = visit_type[0].toUpperCase() + visit_type.slice(1).toLowerCase()
  const title =`${visitTypePretty} Visit with ${[provider_name]}`
  
  return (<div className="visit card">
    <h3>{title}</h3>
    <h4>{datePretty(visit_date)}</h4>
    <div className="patient__image patient__image--large">
      {image && <img src={image} alt="image of patient" />}
    </div>
    <p>
      <b>Weight</b><br />
      {`${weight} lbs`}
    </p>
    <p>
      <b>Height</b><br />
      {`${height} in`}
    </p>
    
</div>)}