const pool = require('../db/pool')
const Appointment = require('./Appointment')

const Provider = function(){
}
const withImage = (provider) => {
  const {has_image, ...attrs} = provider
  // console.log(`Provider#withImage(${has_image})`)
  return {...attrs, 
    image: has_image ? `/images/providers/${provider.id}.png` : null
  }
}

Provider.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM providers')
    const dirty = result.rows
    const clean = dirty.map(row => {
      const {about, ...attrs} = row  // don't include about in listing view
      return withImage(attrs)
    })
    return clean
}

Provider.prototype.find = async (id) => {
  try {

    const query = `SELECT * FROM providers WHERE id=$1`
    console.log(query)
    const {rows} = await pool.query(query, [id])
    if(rows.length === 0){
      throw new Error('could not find any records with id provided:'+id)
    }

    return rows.map(attrs => withImage(attrs))
  } catch (e){
    throw(e)
  }
}

Provider.prototype.findWithAvailability = async (dateStr) => {
  console.log(`Provider.findWithAvailability ${dateStr}`)
  const providers = await Provider.prototype.read()
  // TODO
  // expand scope from 1 day to a range,
  // parse date param instead of blind reuse
  const dateRange = [dateStr]
  return providers.map((attrs) => ({
    ...attrs,
    availability: dateRange.map(date => ({
      date,
      slots: Appointment.getMocks()
    }))
  }))
}

module.exports = new Provider()