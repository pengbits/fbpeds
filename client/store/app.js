import { create } from "zustand";
import { immer } from 'zustand/middleware/immer'

const initialState = {
  patients    : {
    patient: {},
    patients:[],
    loading:false,
    error:false
  },
  providers   : {
    provider: {},
    providers:[],
    loading:false,
    error:false
  },
  appointments: {
    appointment: {},
    appointments:[],
    loading:false,
    error:false
  }
}
const reducer = ((state=initialState, action={}) => {
  switch(action.type){
    case 'patients/LOADING':
      return 
    default
  }
})

// const appStore = create((iset) => ({
//   ...initialState,
//   dispatch: (args) => set((state) => reducer(state, args))
// }))