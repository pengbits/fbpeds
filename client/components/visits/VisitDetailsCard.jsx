import { datePretty } from "../../util/date"
import { Link } from "react-router"

export default ({
  patientId,
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
    {image && <div className="patient__image patient__image--large">
      <img src={image} alt="image of patient" />
    </div>}
    {weight && <p>
      <b>Weight</b><br />
      {`${weight} lbs`}
    </p>}
    {height && <p>
      <b>Height</b><br />
      {`${height} in`}
    </p>}
    <Link to={`/patients/${patientId}`}>Back</Link>
</div>)}