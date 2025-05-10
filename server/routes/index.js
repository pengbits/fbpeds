const patients = require('./patients') 
const providers = require('./providers')
const appointments = require('./appointments')
const auth = require('./auth')
const home = require('./index-router')


module.exports = {
  appointments,
  patients,
  providers,
  auth,
  index: home
}
