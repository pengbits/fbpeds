const pool = require('../db/pool')

const findByUsername = async (username) => {
  const sql = `SELECT * FROM users WHERE username = $1`
  console.log(sql, [username])
  const result = await pool.query(sql, [username])
  return result.rows
}

const create = async ({username,hashedPassword,salt}) => {
  const sql = `INSERT INTO users (username, hashed_password, salt) VALUES ($1, $2, $3) 
              RETURNING id, username`;
  console.log(sql, [username,hashedPassword,salt])
  const result = await pool.query(sql, [username,hashedPassword,salt])
  return result.rows
}

module.exports = {
  findByUsername,
  create
}