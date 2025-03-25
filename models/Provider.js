const pool = require('../db/pool')

const Provider = function(){
}

Provider.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM providers')
    return result.rows
}

module.exports = new Provider()