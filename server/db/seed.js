var path = require('path')
var fs = require('fs')
var pg = require('pg')
require('dotenv').config({
  path: path.resolve(__dirname,".env")
})
console.log(`DB.pool ${process.env.PGUSER}@${process.env.PGHOST}`)
const pool = new pg.Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  max : 5, // max number of clients in the pool
  connectionTimeoutMillis : 5000,
  idleTimeoutMillis : 30000
})

let batch = []
var queries = fs.readFileSync(path.resolve(__dirname,"fbpeds.sql")).toString()
    .replace(/(\r\n|\n|\r)/gm," ") // remove newlines
    .replace(/\s+/g, ' ') // excess white space
    .split(";") // split into all statements
    .map(Function.prototype.call, String.prototype.trim)
    .filter(function(el) {return el.length != 0}); // remove any empty ones

  queries.forEach(function(query) {
    // batch.push(function(done) {
      if (query.indexOf("COPY") === 0) { // COPY - needs special treatment
        var regexp = /COPY\ (.*)\ FROM\ (.*)\ DELIMITERS/gmi;
        var matches = regexp.exec(query);
        var table = matches[1];
        var fileName = matches[2];
        var copyString = "COPY " + table + " FROM STDIN DELIMITERS ',' CSV HEADER";
        console.log(copyString)
        // var stream = client.copyFrom(copyString);
        // stream.on('close', function () {
        //   done();
        // });
        var csvFile = __dirname + '/' + fileName;
        var str = fs.readFileSync(csvFile);
        // stream.write(str);
        // stream.end();
      } else { // Other queries don't need special treatment
        console.log(query)
        // client.query(query, function(result) {
          // done();
        // });
      }
    // })
  })
