
import { datePretty, birthdatePretty } from "../../util/date"
import Table from "../tables/Table"
import { view_types } from "../../store/patientStore"
import { Heading, Text, TabNav } from "@radix-ui/themes"
const PatientDetails = ({
  id,
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
    const baseUrl = `/patients/${id}`

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
          cols={['visit_date','visit_type','provider_name','image']}
          rows={data} 
          baseUrl={baseUrl}
        />

      default:
    }
  }

  return (<div className="patient-details card">
    <div className="patient-details__head">
      <Heading size='7' as='h2'>{name}</Heading>
      <p>
        <b>Birthdate</b>
        <br />{birthdatePretty(birthdate)}
      </p>
      <div className="patient__image patient__image--large">
        <img alt="image of patient" src={image} />
      </div>
    </div>
    <div className="patient-details__body">     
      <TabNav.Root mb="3" data-testid="patient-tabs">
        {view_types.map(viewType => (
        <TabNav.Link key={viewType} active={view.type == viewType} 
          onClick={handleSetView}>{viewType}
        </TabNav.Link>
        ))}
      </TabNav.Root>
      <div data-testid="tabs-content">
        {view.loading ? <p>loading... </p> : renderTabBody(view.type, (view.data || []))}
      </div>
    </div>
  </div>)
}

export default PatientDetails