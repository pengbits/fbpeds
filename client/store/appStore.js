import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import appointmentsSlice from './appointmentStore'
import patientsSlice from './patientStore'
import visitsSlice from './visitStore'

const useAppStore = create(
  immer((...args) => ({
    'appointments': appointmentsSlice(...args),
    'patients': patientsSlice(...args),
    'visits': visitsSlice(...args)
  }))
)

export default useAppStore