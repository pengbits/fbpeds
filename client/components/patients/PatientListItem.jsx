import PatientLink from "./PatientLink"
import { Link as RouterLink } from "react-router"
import PatientAppointmentsList from "./PatientAppointmentsList"
import { Card, Flex, Button, Link } from "@radix-ui/themes"

export default (({id,name,image,appointments}) => (
<Card key={id} className="patient card">
  <Flex>
    {image && <div className="patient__image">
      <PatientLink id={id}>
        <img src={image} alt="image of patient" />
      </PatientLink>
    </div>}

    <div className="patient__actions">
      <p>
        <Link asChild size='5' data-testid="patient-name" className="patient__name">
          <RouterLink to={`/patients/${id}`}>{name}</RouterLink>
        </Link>
      </p>
      <p>
        <Link asChild size="3">
          <RouterLink className="patient__action" to={`/appointments/new/patient/${id}`}>Book a Visit</RouterLink>
        </Link>
      </p>
    </div>
  </Flex>
  <div className="patient__footer">
  <PatientAppointmentsList 
    patientId={id}
    appointments={appointments} 
  />
  </div>
  
</Card>))