const express = require('express')
const app = express()
const routes = require('./routes')
const mongodb = require('mongodb')
let db
let MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/redditClone', (err, database) => {
  if (err) console.error(err)
  db = database
  console.log('Connected to databse')
})

app.use('/api', routes)

module.exports = {app, MongoClient}
