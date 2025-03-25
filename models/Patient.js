const pool = require('../db/pool')

const Patient = function(){
}

Patient.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM patients')
    return result.rows
}

module.exports = new Patient()