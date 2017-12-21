const express = require('express')
const basic = require('./controllers/basic')
const user = require('./controllers/userController')
const post = require('./controllers/postController')
const comment = require('./controllers/cmntController')

const routes = express.Router()

// Basic routes
routes.get('/', basic.get)

// User routes
routes.post('/signup', user.post)

// Post routes
routes.post('/post', post.create)
routes.get('/myFeed', post.getAll)
routes.get('/showPost', post.showPost)
routes.post('/removePost', post.delete)

// Comment routes
routes.post('/comment', comment.post)
routes.post('/removeComment', comment.delete)
module.exports = routes
