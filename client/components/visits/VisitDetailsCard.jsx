import { datePretty } from "../../util/date"
import { Link } from "react-router"
import { Card } from "@radix-ui/themes"
export default ({
  patientId,
  visit_type,
  visit_date,
  provider_name,
  image,
  weight,
  height,
  vaccines
}) => {
  const visitTypePretty = visit_type[0].toUpperCase() + visit_type.slice(1).toLowerCase()
  const title =`${visitTypePretty} Visit with ${[provider_name]}`
  
  return (<Card className="visit card">
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
    {vaccines.length > 0 && <p>
      <b>Vaccines</b><br />
      {vaccines.map(v => v.type).join(', ')}
    </p>}
    <Link to={`/patients/${patientId}`}>Back</Link>
</Card>)}