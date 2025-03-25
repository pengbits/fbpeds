const pool = require('../db/pool')

const Patient = function(){
}

Patient.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM patients')
    return result.rows
}

const related_types = ['visits','growth','prescriptions','immunizations']
Patient.prototype.find = async (id, opts={}) => {
  const query = opts.include && related_types.includes(opts.include) ? 
    `SELECT * FROM patients JOIN ${opts.include} ON ${opts.include}.patient_id=patients.id WHERE patients.id = $1` :
    `SELECT * FROM patients WHERE patients.id = $1`
  ;
  console.log(query)
  const {rows} = await pool.query(query, [id]);

  if(opts.include){
    const {
      name,
      id,
      birthdate
    } = (rows[0])
    const related = rows.map(row => {
      const {name, id, birthdate, ...attrs} = row
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
}

module.exports = new Patient()