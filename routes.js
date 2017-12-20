const express = require('express')
const basic = require('./controllers/basic')
const user = require('./controllers/userController')

const routes = express.Router()

// Basic routes
routes.get('/', basic.get)

// User routes
routes.post('/signup', user.post)

module.exports = routes
