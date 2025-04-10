const dayjs = require('dayjs')
const pool = require('../db/pool')
const { appointments } = require('../routes')
const Patient = function(){
}

const withImage = (patient) => {
  const {last_image, ...attrs} = patient
  const date = dayjs(last_image).format('YYYY-MM-DD')

  return {...attrs, 
    image: last_image ? `/images/patients/${patient.id}/${date}.png` : null
  }
}

Patient.prototype.read = async () => {
  const result = await pool.query(`SELECT * FROM patients LEFT JOIN appointments
    ON appointments.patient_id = patients.id`
  )
  if(!result.rows.length){
    return []
  }

  const patient_map = result.rows.reduce((memo,row) => {
    const {
      id,
      name,
      last_image,
      provider_id,
      datetime,
      patient_id,
      appointment_id
    } = row

    // console.log(`isAppt? ${!!appointment_id}`, row)
    const appt = !!appointment_id ? {
      datetime,
      provider_id,
      patient_id
    } : null

    if(!appt) {
      // if(memo[id]){
        // console.log(`not an appt, id already exists for ${id}`)
      // } else {
        // console.log(`not an appt, new entry: ${id}`)
        memo[id] = {
          name,
          id,
          last_image,
          appointments: []
        }
      // }
    } else {
      if(memo[patient_id]) {
        // console.log(`is an appt, found id ${patient_id}`)
        memo[patient_id].appointments =(memo[patient_id].appointments || [])
        memo[patient_id].appointments.push({
          datetime,
          provider_id
        })
      } else {
        // console.log(`is an appt, no id found for ${patient_id}`)
        memo[patient_id] = {
          id: patient_id,
          name,
          last_image,
          appointments: [{
            datetime,
            provider_id
          }]
        }
      }
    }
    return memo
  }, {})    

  let results = []
  for(const id in patient_map){
    results.push(withImage(patient_map[id]))
  }
  return results
}

const related_types = [
  // 'appointments',
  'visits',
  'growth',
  'prescriptions',
  'immunizations'
];

Patient.prototype.find = async (id, opts={}) => {
  try {
    if(opts.include && !related_types.includes(opts.include)){
      throw new Error(`'${opts.include}' is not a valid type to include in Patient#find()`)
    }
    const query = opts.include ? 
      `SELECT * FROM patients LEFT JOIN ${opts.include} ON ${opts.include}.patient_id=patients.id WHERE patients.id = $1` :
      `SELECT * FROM patients WHERE patients.id = $1`
    ; 

    console.log(query)
    const {rows} = await pool.query(query, [id]);

    if(rows.length === 0){
      throw new Error('could not find any records with id provided:'+id)
    }

    if(opts.include){
      const {
        name,
        id,
        birthdate
      } = (rows[0])

      // discard redundant attributes in each related record
      const related = rows.map(row => {
        const {name, id, birthdate, patient_id, last_image, ...attrs} = row
        return attrs
      })
      // filter out null entries in left join case where there were no relateds
      const emptyObject = {}
      const pk = opts.include.replace(/s$/, '_id')
      const clean = related.filter(related => {
        return related !== emptyObject && related[pk] !== null
      })

      return [{
        name,
        id,
        birthdate,
        [opts.include] : clean
      }]
    }

    return rows.map(attrs => withImage(attrs))
  } catch(e){
    throw e
  }
}

Patient.prototype.findVisit = async (id, visitId) => {
  const query = `
    SELECT v.*, pro.name AS provider_name, pat.*, g.* FROM visits as v
    LEFT JOIN growth AS g ON (v.visit_date = g.date)
    JOIN providers AS pro ON (v.provider_id = pro.id)
    JOIN patients AS pat  ON (v.patient_id = pat.id)
    WHERE visit_id = $1`
  console.log(query)

  const res = await pool.query(query, [visitId])
  const {rows} = res;

  if(rows.length !== 1){
    throw new Error(' couldn\'t find a visit with id:'+visitId)
  }
  const row = rows[0]
  const visits = [{
    visit_type: row.visit_type,
    visit_date: row.visit_date,
    provider_id: row.provider_id,
    provider_name: row.provider_name,
    height: row.height,
    height_percent: row.height_percent,
    weight: row.weight,
    weight_percent: row.weight_percent,
    bmi_percent: row.bmi_percent,
    has_image: row.has_image
  }]

  const patient = {
    id: row.id,
    name: row.name,
    visits
  }
  return [patient]
}

Patient.prototype.findPrescriptions = async (id) => {
  const query = `SELECT p.*, s.*, ph.name AS pharmacy_name
  FROM patients p
  LEFT JOIN prescriptions s ON s.patient_id=p.id 
  INNER JOIN pharmacies ph  ON s.pharmacy_id=ph.id
  WHERE p.id = $1`;
  console.log(query, id)

  const res = await pool.query(query, [id])
  const {rows} = res;
  if(rows.length === 0){
    throw new Error(' couldn\'t find a Patient with id:'+id)
  }

  const row = rows[0]
  const patient = {
    id: row.id,
    name: row.name,
    prescriptions: rows.map(p => ({
      date: p.date,
      name: p.prescription_name,
      directions: p.directions,
      pharmacy: {
        id: p.pharmacy_id,
        name: p.pharmacy_name
      }

    }))
  }
  return [patient]
}
module.exports = new Patient()