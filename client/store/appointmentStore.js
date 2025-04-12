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
      set(state => {state[k].appointment = attrs})
    },
    
    fetchProviderAvailability: async () => {
      const {appointment} = get()[k]
      try {
        set(state => {
          state[k].loading = true; 
          state[k].creatingAppointment = false
          state[k].fetchingAvailability = true 
        })
        const providers = await getProviderAvailability(appointment)
        set(state => {state[k].providersWithAvailability = providers})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    },

    createAppointment: async (attrs) => {
      try {
        set(state => {
          state[k].loading = true; 
          state[k].fetchingAvailability = false;
          state[k].creatingAppointment = true
        })
        const appt = await createAppointment(attrs)
        set(state => {state[k].appointment = appt})
      } catch(e) {
        set(state => {state[k].error = e})
      } finally {
        set(state => {
          state[k].loading = false; 
          state[k].fetchingAvailability = false
          state[k].appointment = {}
        })
      }
    }
  }
}

export default reducer