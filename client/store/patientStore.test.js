import { renderHook, act } from "@testing-library/react"
import useAppStore from "./appStore"
import getPatientsMock from "../mocks/getPatients"

let result

beforeEach(() => {
  result = renderHook(() => useAppStore()).result
})


let patientWithAppointment
let appointment
describe('Patient Store', () => {
  describe('AppointmentsList', () => {
    it('updates the appointment list when an appointment is deleted', async () => {
      fetch
        .once(JSON.stringify(getPatientsMock))
        .once(req => ({status:200, body:JSON.stringify({success:true})}))

      const {fetchPatients} = result.current.patients
      await act(async() => {
        await fetchPatients()
      })
 
      const {patients} = result.current.patients
      const {deleteAppointment} = result.current.appointments
      patientWithAppointment = patients.find(p => p.appointments.length)
      appointment = patientWithAppointment.appointments[0]

      
      await act(async() => {
        await deleteAppointment({
          appointmentId: appointment.appointment_id,
          patientId: patientWithAppointment.id
        })
        // would prefer this to be encapsulated inside the store,
        // but having a hard time chaning the immer sets together
        result.current.patients.removeAppointmentFromPatient({
          appointmentId: appointment.appointment_id,
          patientId: patientWithAppointment.id
        })
      })

      patientWithAppointment = result.current.patients.patients.find(p => p.id == patientWithAppointment.id)
      expect(patientWithAppointment.appointments.find(a => a.id == appointment.id)).toEqual(undefined)
    })
  })
})