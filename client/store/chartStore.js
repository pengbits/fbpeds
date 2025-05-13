import { transform, getGenericPercentileChart } from "../api/charts"

const initialState = {
  height: null, // {labels:[], data:{'3%':[], '5%':[] }} 
  weight: null, // {labels:[], data:{'3%':[], '5%':[] }}
  generic: {},
  loading:false,
  error:false,
}
const k = 'charts'
const reducer = (set,get) => {
  return {
    ...initialState,
    getChart : (opts) => {
      try {
        // pulling the view's internal data like this might be a bad idea
        // we are assuming we've previously set the view to 'growth' here...
        // in PatientStore#fetchView()
        // state[k].view.data = state[k].views[type][id_]

        // ideally this would be a pure reducer function
        // and not need to set state at all!
        const {views,patient} = get().patients
        const rows = views.growth[patient.id]
        // console.log(`getChart transform ${rows.length} rows for ${opts.fetchGenericPercentileChart}`)
        const data = transform(rows, opts)
        set(state => {state[k][opts.chart] = data})
      } catch (e) {
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    },

    // had to roll this simple convenience method 
    // cos the intitial accessor only made sense in testing context
    // (should not be setting state just to change shape of the data)
    chart : (chartType) => {
      const {views,patient} = get().patients
      // console.log(`chart(${chartType})`, views.growth[patient.id])
      const rows = views.growth[patient.id] || []
      // console.log(`chart() transform ${rows.length} rows for ${chartType}`)
      const data =  transform(rows, {chart:chartType})
      console.log(`chart(${chartType})`, data)
      return data
    },

    fetchGenericPercentileChart : async (opts) => {
      // console.log(`fetchGeneric`, opts)
      try {
        set(state => {state[k].loading = true})
        const json = await getGenericPercentileChart(opts)
        console.log('generic.'+opts.chart, json)
        set(state => {state[k].generic[opts.chart] = json})
      } catch (e) {
        set(state => {state[k].error = e})
      } finally {
        set(state => {state[k].loading = false})
      }
    }
  }
}

export default reducer