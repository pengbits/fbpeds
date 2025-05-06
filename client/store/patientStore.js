import {
  getPatients, 
  getPatient
} from '../api/patients'

const initialState = {
  patient: {},
  patients:[],
  loading:false,
  error:false,
  view: {
    type: null,
    loading: false,
  },
  views: {}
}

export const view_types = [
  'growth',
  'immunizations',
  'prescriptions',
  'visits'
]
const k = 'patients'
const reducer = (set,get) => {
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

    removeAppointmentFromPatient:  ({patientId, appointmentId}) => {
      // console.log(`patients.removeAppointmentFromPatient`, patientId, appointmentId)
      try {
        if(!patientId || !appointmentId) throw new Error('removeAppointmentFromPatient expects patientId and appointmentId:', patientId, appointmentId)
        set(state => {
          let idx=0
          const patient = state[k].patients.find((p,i) => {idx=i; return p.id == patientId})
          // console.log('before', patient.appointments.length)
          const appointments = patient.appointments.filter(a => a.appointment_id !== appointmentId)
          state[k].patients[idx].appointments = appointments
          // console.log('after', state[k].patients[idx].appointments.length)
        })
      } catch(e){
        set((state) => {state[k].error = e})
      }
    },

    // wrote this first but it makes more sense to 
    // fetch the initial view w/ patient data
    // as a single call when component first mounts
    fetchPatient: async (id) => {
      try {
        if(!id) throw new Error('id is required')
        set((state) => {state[k].loading = true})
        const patients = await getPatient(id)
        console.log('Store', patients[0])
        set((state) => {state[k].patient = patients[0]})
      } catch(e){
        set((state) => {state[k].error = e})
      } finally {
        set((state) => {state[k].loading = false})
      }
    },

    resetPatient: () => {
      set(state => {state[k].patient = {...initialState.patient}})
    },

    setView: (view) => {
      if(!view_types.includes(view)){
        throw new Error(`${view} is not a supported type: ${view_types.join(', ')}`)
      }
      set((state) => {
        state[k].view.type = view
      })
    },

    resetView: () => {
      set(state => {state[k].view = {...initialState.view}})
    },

    fetchView: async (id = null, typ = null) => {
      const state_ = get()
      const type = typ || state_[k].view.type
      const id_ = id || state_[k].patient.id
      console.log(`fetchView id=${id_}, ${type}`)
      try {
        // check cache
        if(!!state_[k].views[type] && !!state_[k].views[type][id_]){
          // console.log(`fetchView(${type}:${id_}) is in cache`)
          set((state) => {
            state[k].view.data = state[k].views[type][id_]
          })
        } 
        else {
          // console.log(`fetchView:${type} loading...`)
          set(state => {
            state[k].view.loading = true
          })

          const data = await getPatient(id_, {include: type})

          if(data.length !== 1) throw new Error('expected data for one patient')
          if(!data[0][type])    throw new Error('bad response for '+type)

          set((state) => {
            // store the data in cache, under patient_id 
            state[k].views[type] = {
              [id_ ] : sortData(data[0][type], {type, order:'desc'})
            }

            // store the data in active view
            state[k].view.data = data[0][type]
          
            // update patient data in case this is first api call
            state[k].patient = {
              id: data[0].id,
              name: data[0].name,
              birthdate: data[0].birthdate,
              image: data[0].image
            }
          })
        }
      } catch(e) {
        set((state) => {state[k].view.error = e})
      } finally {
        set((state) => {state[k].view.loading = false})
      }
    }
  }
}

export const sortData = (data, opts={}) => {
  let sortBy = 'date' // not configurable yet
  let order = opts.order || 'asc' 
  const {type} = opts
  // console.log('sortData '+type)
  if(type == 'visits') { sortBy = 'visit_date'}

  const sorted = !sortBy ? data : (
    data.sort((a,b) => a[sortBy] < b[sortBy] ? -1 : 1)
  )
  const ordered = order == 'desc' ? sorted.reverse() : sorted
  // console.log(ordered.map(o => `'${o.date}'`).join(","))
  return ordered
}

export default reducer