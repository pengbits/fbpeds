import { create } from "zustand";
import { immer } from "zustand/middleware/immer"
import { getProviderAvailability } from "../api/appointments";

const initialState = {
  appointment: {},
  appointments:[],
  loading:false,
  error:false,
  fetchingAvailability:false
}
const k = 'appointments'
const reducer = set => {
  return {
    ...initialState,
    fetchProviderAvailability: async () => {
      set(state => {state[k].loading = true; state[k].fetchingAvailability = true })
      const providers = await getProviderAvailability()
      console.log(`fetchProviderAvailability`, providers)
      set(state => {state[k].loading = false})
    }
  }
}

export default reducer