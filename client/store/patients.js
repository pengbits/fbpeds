import { create } from "zustand";


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
      set(state => ({...state, loading: true}))
      const response = await new Promise(res => setTimeout(res, 1000, {data:[1,2,3]}))
      set(state => ({...state, loading: false, patients: response.data}))
    }
  }
})
