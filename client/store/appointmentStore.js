import { 
  getProviderAvailability, 
  createAppointment 
} from "../api/appointments";

const initialState = {
  appointment: {},
  appointments:[],
  providersWithAvailability:[],
  loading:false,
  error:false,
  fetchingAvailability:false,
  creatingAppointment:false
}
const k = 'appointments'
const reducer = (set,get) => {
  return {
    ...initialState,

    setAppointment: (attrs) => {
      console.log('setAppointment', attrs)
      set(state => {state[k].appointment = attrs})
    },
    
    fetchProviderAvailability: async () => {
      const {appointment} = get()[k]
      try {
        set(state => {state[k].loading = true; state[k].fetchingAvailability = true })
        const providers = await getProviderAvailability(appointment)
        console.log(`fetchProviderAvailability`, providers)
        set(state => {state[k].providersWithAvailability = providers})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    },

    createAppointment: async (attrs) => {
      try {
        set(state => {state[k].loading = true; state[k].creatingAppointment = true})
        const appt = await createAppointment(attrs)
        set(state => {state[k].appointment = appt})
      } catch(e) {
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    }
  }
}

export default reducer