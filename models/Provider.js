const pool = require('../db/pool')

const Provider = function(){
}

Provider.prototype.read = async () => {
    const result = await pool.query('SELECT * FROM providers')
    const dirty = result.rows
    const clean = dirty.map(row => {
      const {about, ...attrs} = row
      return attrs // don't include about in listing view
    })
    return clean
}

Provider.prototype.find = async (id) => {
  try {

    const query = `SELECT * FROM providers WHERE id=$1`
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