
import { datePretty, birthdatePretty } from "../../util/date"


const PatientDetails = ({
  name,
  image,
  birthdate,
  view,
  setView
}) => {
    
  const handleSetView = (e) => {
    // console.log(`PatientDetails.handleSetView('${e.target.innerHTML}')`)
    e.preventDefault()
    setView(e.target.innerHTML)
  }

  return (<div className="patient-details">
    <div className="patient-details__head">
      <h2>{name}</h2>
      <p>{birthdatePretty(birthdate)}</p>
      <div className="patient__image patient__image--large">
        <img alt="image of patient" src={image} />
      </div>
    </div>
    <div className="patient-details__body">
      <div className="patient-tabs">
        <ul className="patient-tabs__head">
          <li><a onClick={handleSetView} href="#">growth</a></li>
          <li><a onClick={handleSetView} href="#">immunizations</a></li>
          <li><a onClick={handleSetView} href="#">prescriptions</a></li>
        </ul> 
        <div className="patient-tabs__body">
          <div data-testid="tabs-content">
            {view.loading ? <p>loading... </p> : (view.data || []).map(row => {
              return <p key={row.immunization_id}>{`${datePretty(row.date)}:${row.type}`}</p>
            })}
          </div>
        </div>
      </div>
    </div>

  </div>)
}

export default PatientDetails