'use strict'
let http = require('http')
let PORT = 5000

let server = http.createServer(function(res, req) {
  res.write('server is running on', PORT)
  res.end()
})

server.listen(PORT)
console.log('server is running on', PORT)
