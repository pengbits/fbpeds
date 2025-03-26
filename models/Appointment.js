const pool = require('../db/pool')

const Appointment = function(){
}

Appointment.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM appointments')
    return result.rows
}

Appointment.prototype.create = async ({datetime, provider_id, patient_id}) => {
  if(!provider_id || !patient_id){
    throw new Error('must provide patient_id and provider_id to appointment')
  }

  // todo validate date
  if(!datetime) {
    throw new Error('must provide datetime')
  }

  const result = await pool.query (
    `INSERT INTO appointments (datetime, provider_id, patient_id)
     VALUES ($1, $2, $3) RETURNING id, datetime, provider_id, patient_id`, 
    [datetime, provider_id, patient_id]
  )
  // console.log(result.rows)
  return result.rows
}

module.exports = new Appointment()
