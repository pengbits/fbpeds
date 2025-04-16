
import { datePretty, birthdatePretty } from "../../util/date"
import Table from "../tables/Table"

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

  const renderTabBody = (type, data) => {
    switch(type){
      case 'growth':
        return <>
          <Table 
            cols={['date','weight','weight_percent']}
            rows={data}
          />
          <Table 
            cols={['date','height','height_percent']}
            rows={data}
          />
          </>
      case 'immunizations':
        return <Table 
          cols={['date','type']} 
          rows={data} 
        />
      case 'prescriptions':
        return <Table 
          cols={['date','name','directions']}
          rows={data} 
        />
      default:
        return <p>x</p>
    }
  }
  console.log(view.type)

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
          <li className={`patient-tabs__tab ${view.type == 'growth' ? 'patient-tabs__tab--active' : ''}`}>
            <a onClick={handleSetView} href="#">growth</a>
          </li>
          <li className={`patient-tabs__tab ${view.type == 'immunizations' ? 'patient-tabs__tab--active' : ''}`}>
            <a onClick={handleSetView} href="#">immunizations</a>
          </li>
          <li className={`patient-tabs__tab ${view.type == 'prescriptions' ? 'patient-tabs__tab--active' : ''}`}>
            <a onClick={handleSetView} href="#">prescriptions</a>
          </li>
        </ul> 
        <div className="patient-tabs__body">
          <div data-testid="tabs-content">
            {view.loading ? <p>loading... </p> : renderTabBody(view.type, view.data || [])}
          </div>
        </div>
      </div>
    </div>

  </div>)
}

export default PatientDetails