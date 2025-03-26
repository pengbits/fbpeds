const { engine } = require('../app')
const pool = require('../db/pool')

const Patient = function(){
}

Patient.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM patients')
    return result.rows
}

const related_types = [
  'appointments',
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
      `SELECT * FROM patients JOIN ${opts.include} ON ${opts.include}.patient_id=patients.id WHERE patients.id = $1` :
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
      const related = rows.map(row => {
        const {name, id, birthdate, patient_id, ...attrs} = row
        return attrs
      })

      return [{
        name,
        id,
        birthdate,
        [opts.include] : related
      }]
    }
    return rows
  } catch(e){
    throw e
  }
}

module.exports = new Patient()