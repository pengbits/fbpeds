import { 
  getVisit, 
} from "../api/visits";

const initialState = {
  visit: null,
  visits:[],
  loading:false,
  error:false,
}
const k = 'visits'
const reducer = (set,get) => {
  return {
    ...initialState,

    fetchVisit: async ({id, visitId}) => {
      try {
        set(state => {
          state[k].loading = true; 
        })
        const patients = await getVisit(id, visitId)
        if(patients.length !== 1) throw new Error('unexpected json response')
        const {visits} = patients[0]
        if(visits.length !== 1 ) throw new Error('unexpected json response')
        const visit = visits[0]
        set(state => {state[k].visit = visit})
      } catch(e){
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    }
  }
}

export default reducer