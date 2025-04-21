
import { datePretty, birthdatePretty } from "../../util/date"
import Table from "../tables/Table"
import { view_types } from "../../store/patientStore"

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
    if(!type || data.length == 0){
      return null
    }
    switch(type){
      case 'growth':
        return <>
          <Table 
            cols={['date','age_years','weight','weight_percent']}
            rows={data}
          />
          <Table 
            cols={['date','age_years','height','height_percent']}
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

      case 'visits':
        return <Table 
          cols={['visit_date','visit_type','provider_id','has_image']}
          rows={data} 
        />

      default:
    }
  }

  return (<div className="patient-details">
    <div className="patient-details__head">
      <h2>{name}</h2>
      <p><b>Birthdate</b><br />{birthdatePretty(birthdate)}</p>
      <div className="patient__image patient__image--large">
        <img alt="image of patient" src={image} />
      </div>
    </div>
    <div className="patient-details__body">
      <div className="patient-tabs">
        <ul className="patient-tabs__head">
          {view_types.map(viewType => (
          <li key={viewType} className={`patient-tabs__tab ${view.type == viewType ? 'patient-tabs__tab--active' : ''}`}>
            <a onClick={handleSetView} href="#">{viewType}</a>
          </li>
          ))}
        </ul> 
        <div className="patient-tabs__body">
          <div data-testid="tabs-content">
            {view.loading ? <p>loading... </p> : renderTabBody(view.type, (view.data || []))}
          </div>
        </div>
      </div>
    </div>

  </div>)
}

export default PatientDetails