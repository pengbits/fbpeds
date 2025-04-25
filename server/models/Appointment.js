const pool = require('../db/pool')

const Appointment = function(){
}

Appointment.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM appointments ORDER BY appointment_id ASC')
    return result.rows
}

Appointment.prototype.find = async (id) => {
  const result = await pool.query('SELECT * FROM appointments WHERE appointment_id=$1', [id])
  if(result.rows.length !== 1){
    throw new Error('Expected 1 row for Appointment, found '+result.rows.length)
  }
  return result.rows
}

Appointment.prototype.create = async ({datetime, provider_id, patient_id, visit_type}) => {
  if(!datetime || !provider_id || !patient_id || !visit_type){
    throw new Error('must provide datetime, patient_id, provider_id and visit_type to appointment')
  }

  // todo validate date
  if(!datetime) {
    throw new Error('must provide datetime')
  }

  const result = await pool.query (
    `INSERT INTO appointments (datetime, visit_type, provider_id, patient_id)
     VALUES ($1, $2, $3, $4) RETURNING appointment_id, datetime, visit_type, provider_id, patient_id`, 
    [datetime, visit_type, provider_id, patient_id]
  )
  // console.log(result.rows)
  return result.rows
}

Appointment.prototype.update = async (id, {datetime, patient_id, provider_id, visit_type}) => {
  if(!id || !datetime || !provider_id || !patient_id || !visit_type){
    throw new Error('must provide datetime, patient_id, provider_id and visit_type to and id of appointment to update')
  }

  const sql = `UPDATE appointments SET  datetime=$1, provider_id=$2, patient_id=$3, visit_type=$4 WHERE appointment_id = $5 
    RETURNING appointment_id, datetime, provider_id, patient_id, visit_type`
  console.log(sql, [datetime, provider_id, patient_id, visit_type, id])
  const result = await pool.query(sql, [datetime, provider_id, patient_id, visit_type, id])
  return result.rows
}

Appointment.prototype.getMocks = () => {
  // 8 am first appt
  const slot_window_start = 8
  // 8am-4pm window is 8 hours is 480 mins
  const slots_total_mins = 480
  // slots could be any of these lengths
  const slot_sizes = [20,30,35,40,45]
  // how many of the slots are free/ available?
  const slot_available_ratio = 0.5
  // convenince method
  const getSize = () => (slot_sizes[Math.floor(Math.random() * slot_sizes.length )])

  let slots = [{start:0, end:0 + getSize()}]
  let end = 0

  while(end < slots_total_mins){
    const prev = slots[slots.length-1]
    end = prev.end + getSize()
    slots.push({
      start: prev.end,
      end
    })
  }
  
  // expand raw values into objects with hours and mins,
  // starting from 8am
  const formatted = slots.map(slot => ({
    start: {
      hours : Math.floor(slot.start / 60) + slot_window_start,
      mins  : slot.start % 60
    },
    end: {
      hours : Math.floor(slot.end / 60) + slot_window_start,
      mins  : slot.end % 60
    }
  }))

  // reject some of the times as unvailable
  return formatted.filter(slot => (Math.random() < slot_available_ratio))
}

Appointment.prototype.delete = async (id) => {
  await Appointment.prototype.find(id)
  const sql = 'DELETE FROM appointments WHERE appointment_id=$1'
  console.log(sql, [id])
  const result = await pool.query(sql, [id])
  return {success:true}
}

module.exports = new Appointment()
