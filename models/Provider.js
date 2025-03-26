const pool = require('../db/pool')

const Provider = function(){
}

Provider.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM providers')
    return result.rows
}

Provider.prototype.find = async (id, opts={}) => {
  try {

    const query = `SELECT * FROM providers WHERE id=$1`
    console.log(query)
    const {rows} = await pool.query(query, [id])
    
    if(rows.length === 0){
      throw new Error('could not find any records with id provided:'+id)
    }
    return rows
  } catch (e){
    throw(e)
  }
}

module.exports = new Provider()