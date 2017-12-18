const express = require('express')
const basic = require('./controllers/basic')
const routes = express()

routes.get('/', basic.get)

module.exports = routes
