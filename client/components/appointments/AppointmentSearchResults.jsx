import daysjs from 'dayjs'

const AppointmentSearchResults = ({data}) => {

  console.log('AppointmentSearchResults', data)
  return (
    <>
    <h2>Well Visits in Brooklyn after April 1 with any Provider</h2>
    <div data-testid="appointment-providers" className="appointment-providers">
      <div className="provider">
        <h3>Dr Augustine Gaw</h3>
        <div className="provider__availability">
          ....
        </div>
      </div>
      <div className="provider">
        <h3>Dr Karen Teoh</h3>
        <div className="provider__availability">
          ....
        </div>
      </div>
    </div>
    </>

  )
}

export default AppointmentSearchResults