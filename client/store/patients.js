import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
import {getPatients, getPatient} from '../api/patients'

const initialState = {
  patient: {},
  patients:[],
  loading:false,
  error:false
}

const reducer = set => {
  return {
    ...initialState,
    fetchPatients: async () => {
      try {
        set((state) => {state.loading = true})
        const patients = await getPatients()
        set((state) => {state.patients = patients})
      } catch(e){
        set((state) => {state.error = e})
      } finally {
        set((state) => {state.loading = false})
      }
    },

    fetchPatient: async (id) => {
      try {
        if(!id) throw new Error('id is required')
        set((state) => {state.loading = true})
        const patients = await getPatient(id)
        set((state) => {state.patients = patients})
      } catch(e){
        set((state) => {state.error = e})
      } finally {
        set((state) => {state.loading = false})
      }
    }
  }
}

export const usePatientStore = create(
  immer((set) => reducer(set))
)
// cam we export a vanilla version as well, for testing purposes?