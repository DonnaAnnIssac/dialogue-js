const express = require('express')
const app = express()
const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(express)
const config = require('./config')

let MongoClient = require('mongodb').MongoClient
let connectionString = 'mongodb://' + config.db.host + ':' + config.db.port + '/' + config.db.name
MongoClient.connect(connectionString, (err, database) => {
  if (err) console.error(err)
  app.db = database.db(config.db.name)
  console.log('Connected to database')

  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session({
    secret: 'S3CRE7',
    // store: new MongoStore ({
    //   db: config.db.name,
    //   host: config.db.host,
    //   port: config.db.port
    // }),
    resave: false,
    saveUninitialized: true
  }))

  app.use('/api', routes)
  app.use(express.static('static'))

  let server = app.listen(config.app.port, () => {
    let port = server.address().port
    console.log('Express server listening on port %s', port)
  })
})
