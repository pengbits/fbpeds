const PatientDetails = (patient => (<div className="patient-details">
  <h2>{patient.name}</h2>
  <p>{patient.birthdate}</p>
  <div className="patient__image patient__image--large">
    <img alt="image of patient" src={patient.image} />
  </div>
</div>))

export default PatientDetails