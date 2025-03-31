import { useLoaderData } from "react-router"
const PatientsPage = () => {
  const {patients} = useLoaderData()
  return (<div className="patients">
    <h2>Patients</h2>
    {patients && patients.map(({name,image,id}) => (
      <div key={id} className="patient">
        <h3>{name}</h3>
        <div className="patient__image">
          <img src={image} />
        </div>
      </div>
    ))}
  </div>)
}
export default PatientsPage