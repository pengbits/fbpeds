import { birthdatePretty } from "../../util/date"

const PatientDetails = (({name,image,birthdate}) => (<div className="patient-details">
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
        <li>growth</li>
        <li>immunizations</li>
        <li>prescriptions</li>
      </ul>
      <div className="patient-tabs__body"></div>
      </div>
  </div>
  {/* <div className="patient-details__footer">
    </div> */}
</div>))

export default PatientDetails