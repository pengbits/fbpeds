import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
import {getPatients, getPatient} from '../api/patients'

const initialState = {
  patient: {},
  patients:[],
  loading:false,
  error:false
}
const k = 'patients'
const reducer = set => {
  return {
    ...initialState,
    fetchPatients: async () => {
      try {
        set((state) => {state[k].loading = true})
        const patients = await getPatients()
        set((state) => {state[k].patients = patients})
      } catch(e){
        set((state) => {state[k].error = e})
      } finally {
        set((state) => {state[k].loading = false})
      }
    },

    fetchPatient: async (id) => {
      try {
        if(!id) throw new Error('id is required')
        set((state) => {state[k].loading = true})
        const patients = await getPatient(id)
        set((state) => {state[k].patients = patients})
      } catch(e){
        set((state) => {state[k].error = e})
      } finally {
        set((state) => {state[k].loading = false})
      }
    }
  }
}

export default reducer