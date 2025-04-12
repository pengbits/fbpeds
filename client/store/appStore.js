import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import appointmentsSlice from './appointmentStore'
import patientsSlice from './patientStore'

const useAppStore = create(
  immer((set) => ({
    'appointments': appointmentsSlice(set),
    'patients': patientsSlice(set)
  }))
)

export default useAppStore
// cam we export a vanilla version as well, for testing purposes?