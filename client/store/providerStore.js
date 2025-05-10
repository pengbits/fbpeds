import { 
  getProviders,
  getProvider
} from "../api/providers";

const initialState = {
  provider: null,
  providers:[],
  loading:false,
  error:false,
}
const k = 'providers'
const reducer = (set,get) => {
  return {
    ...initialState,

    fetchProviders: async () => {
      try {
        set(state => {
          state[k].loading = true; 
        })
        const providers = await getProviders()
        set(state => {state[k].providers = providers})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    },

    fetchProvider: async (id) => {
      try {
        set(state => {
          state[k].loading = true; 
        })
        const [provider] = await getProvider(id)
        set(state => {state[k].provider = provider})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    }
  }
}

export default reducer