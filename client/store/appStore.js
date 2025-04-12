import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import appointmentsSlice from './appointmentStore'
import patientsSlice from './patientStore'

const useAppStore = create(
  immer((...args) => ({
    'appointments': appointmentsSlice(...args),
    'patients': patientsSlice(...args)
  }))
)

export default useAppStore
// cam we export a vanilla version as well, for testing purposes?