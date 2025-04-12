import { create } from "zustand";
import {getPatients, getPatient} from '../api/patients'

const initialState = {
  patient: {},
  patients:[],
  loading:false,
  error:false
}

export const usePatientStore = create((set) => {
  return {
    ...initialState,
    fetchPatients: async () => {
      try {
        set(state => ({...state, loading: true}))
        const patients = await getPatients()
        set(state => ({...state, patients}))
      } catch(e){
        set(state => ({...state, error:e}))
      } finally {
        set(state => ({...state, loading:false}))
      }
    }
  }
})
