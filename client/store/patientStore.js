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

    // wrote this first but  it makes more sense to 
    // fetch the initial view w/ patient data
    // as a single call when component first mounts
    fetchPatient: async (id) => {
      try {
        if(!id) throw new Error('id is required')
        set((state) => {state[k].loading = true})
        const patients = await getPatient(id)
        set((state) => {state[k].patient = patients[0]})
      } catch(e){
        set((state) => {state[k].error = e})
      } finally {
        set((state) => {state[k].loading = false})
      }
    },

    setView: (view) => {
      if(!view_types.includes(view)){
        throw new Error(`${view} is not a supported type: ${view_types.join(', ')}`)
      }
      set((state) => {
        state[k].view.type = view
        state[k].view.loading = true
      })
    },

    fetchView: async (id = null) => {
      const state_ = get()
      const type = state_[k].view.type

      try {
        // check cache
        if(!!state_[k].views[type]){
          console.log(`fetchView(${type}) is in cache`)
          set((state) => {
            state[k].view.data = state[k].views[type].data
          })
        } 
        else {
          set(state => {
            state[k].view.loading = true
          })

          const data = await getPatient(id || state_[k].patient.id, {include: type})
          if(data.length !== 1) throw new Error('expected data for one patient')
          if(!data[0][type])    throw new Error('bad response for '+type)
        
          set((state) => {
            // store the data in cache
            state[k].views[type] = {
              'data' : sortData(data[0][type], type)
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
export const sortData = (data, type) => {
  return data
}

export default reducer