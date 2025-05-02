import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'
import appointmentsSlice from './appointmentStore'
import patientsSlice from './patientStore'
import chartsSlice from './chartStore'
import visitsSlice from './visitStore'
import providersSlice from './providerStore'

const useAppStore = create(
  immer((...args) => ({
    'appointments': appointmentsSlice(...args),
    'patients': patientsSlice(...args),
    'charts': chartsSlice(...args),
    'visits': visitsSlice(...args),
    'providers': providersSlice(...args)
  }))
)

export default useAppStore