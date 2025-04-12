// given  there is a patient_id, date and appt_type and a list of available times
// when   I click on a time slot
// then   it will send the appointment attrs to the server
// when   it loads
// then   there will be a new appointment associated with the patient
// expect(await screen.findByText('Your appointment has been created')).toBeInTheDocument()

// NOTE I'm not sure this really falls under 'store', but it is cross-domain
// in the real user flow, this is all handled by AppointmentSearchPage,
// scoped to a patient, but using appointment apis
// getProviderAvailability
// createAppointment
describe('Store', () => {
  describe('create appointment ', () => {
    test.todo('given a provider_id, patient_id, visit_type and datetime')
    test.todo('when I submit')
    test.todo('the appointment will be created')
  })
})