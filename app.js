const express = require('express')
const app = express()
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')
const config = require('./config.js')

app.use(bodyParser.json())

app.use(session({
  // store: new MongoStore({
  //   dbPromise: ''
  // }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

let MongoClient = require('mongodb').MongoClient
let connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name
MongoClient.connect(connectionString, (err, database) => {
  if (err) console.error(err)
  app.db = database.db(config.db.name)
  console.log('Connected to database')

  app.use('/api', routes)
  app.use(express.static('static'))

  let server = app.listen(config.app.port, () => {
    let port = server.address().port
    console.log('Express server listening on port %s', port)
  })
})
