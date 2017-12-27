const express = require('express')
const app = express()
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(bodyParser.json())
app.use(session({secret: 'secret'}))
let MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/redditClone', (err, database) => {
  if (err) console.error(err)

  app.db = database.db('redditClone')
  console.log('Connected to database')

  app.use('/api', routes)
  app.use(express.static('static'))

  let server = app.listen(5000, () => {
    let port = server.address().port
    console.log('Express server listening on port %s', port)
  })
})
