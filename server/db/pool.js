const pg = require('pg')
const pool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max : 5, // max number of clients in the pool
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 30000
})

module.exports = pool