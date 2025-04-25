import { 
  getProviderAvailability, 
  createAppointment,
  updateAppointment,
  deleteAppointment, 
  getAppointment
} from "../api/appointments";

const initialState = {
  appointment: {},
  appointments:[],
  providersWithAvailability:[],
  loading:false,
  error:false,
  fetchingAvailability:false,
  creatingAppointment:false,
  deletingAppointment:false,
  updatingAppointment: false,
  fetchingAppointment: false
}
const k = 'appointments'
const reducer = (set,get) => {
  return {
    ...initialState,

    setAppointment: (attrs) => {
      set(state => {state[k].appointment = attrs})
    },

    fetchAppointment: async (id) => {
      try {
        set(state => {
          state[k].loading = true; 
          state[k].creatingAppointment = false
          state[k].updatingAppointment = false
          state[k].fetchingAvailability= false
          state[k].fetchingAppointment = true
        })
        const appt = await getAppointment(id)
        console.log(appt)
        set(state => {state[k].appointment = appt})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {
          state[k].loading = false
        })
      }
    },
    
    fetchProviderAvailability: async () => {
      const {appointment} = get()[k]
      try {
        set(state => {
          state[k].loading = true; 
          state[k].creatingAppointment = false
          state[k].updatingAppointment = false
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
          state[k].updatingAppointment = false
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
    },

    updateAppointment: async (attrs) => {
      try {
        set(state => {
          state[k].loading = true; 
          state[k].fetchingAppointment = false
          state[k].fetchingAvailability = false;
          state[k].creatingAppointment = false
          state[k].updatingAppointment = true
        })
        const appt = await updateAppointment(attrs)
        set(state => {state[k].appointment = appt})
      } catch(e) {
        set(state => {state[k].error = e})
      } finally {
        set(state => {
          state[k].loading = false; 
          state[k].fetchingAvailability = false
        })
      }
    },

    deleteAppointment: async({appointmentId,patientId}) => {
      console.log(`appointmentStore.deleteAppt `, patientId, appointmentId)
      try {
        set((state) => {
          state[k].loading = true; 
          state[k].deletingAppointment = true
          state[k].appointment = {}
        })
        return deleteAppointment(appointmentId)
        // return true
      } catch(e){
        console.log(e)
        set(state => {state[k].error = e})
      } finally {
        set(state => {
          state[k].loading = false; 
          state[k].deletingAppointment = false
        })
      }
    }
  }
}

export default reducer