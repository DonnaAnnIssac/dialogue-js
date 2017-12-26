const express = require('express')
const user = require('./controllers/userController')
const post = require('./controllers/postController')
const comment = require('./controllers/cmntController')

const routes = express.Router()

// User routes
routes.post('/user/signup', user.create)
routes.post('/user/signin', user.login)

// Post routes
routes.get('/post', post.getAll)
routes.get('/post/show', post.show)
routes.get('/post/mine', post.getMyPosts)
routes.post('/post/create', post.create)
routes.post('/post/remove', post.delete)
routes.post('/post/update', post.update)
routes.post('/post/upvote', post.upvote)
routes.post('/post/downvote', post.downvote)

// Comment routes
routes.post('/comment/create', comment.create)
routes.post('/comment/remove', comment.delete)
routes.post('/comment/update', comment.update)
routes.post('/comment/upvote', comment.upvote)
routes.post('/comment/downvote', comment.downvote)

module.exports = routes
