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
      fetch.mockResponseOnce(JSON.stringify(getPatientsMock))
 
      const {fetchPatients} = result.current.patients
      await act(async() => {
        await fetchPatients()
      })
 
      const {patients} = result.current.patients
      const {deleteAppointment} = result.current.appointments
      patientWithAppointment = patients.find(p => p.appointments.length)
      appointment = patientWithAppointment.appointments[0]
      
      fetch.mockResponseOnce(() => {
        return Promise.resolve(res => ({status:204}))
      })

      
      await act(async() => {
        await deleteAppointment({
          appointmentId: appointment.appointment_id,
          patientId: patientWithAppointment.id
        })
      })

      patientWithAppointment = result.current.patients.patients.find(p => p.id == patientWithAppointment.id)
      expect(patientWithAppointment.appointments.find(a => a.id == appointment.id)).toEqual(undefined)
    })
  })
})