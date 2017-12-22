const express = require('express')
const user = require('./controllers/userController')
const post = require('./controllers/postController')
const comment = require('./controllers/cmntController')

const routes = express.Router()

// User routes
routes.post('/signup', user.post)
routes.post('/signin', user.login)

// Post routes
routes.post('/post', post.create)
routes.get('/myFeed', post.getAll)
routes.get('/show', post.show)
routes.get('/myPosts', post.getMyPosts)
routes.post('/removePost', post.delete)
routes.post('/updatePost', post.update)
routes.post('/updatePostScore', post.updateScore)

// Comment routes
routes.post('/comment', comment.post)
routes.post('/removeComment', comment.delete)
routes.post('./updateComment', comment.update)
routes.post('/updateCommentScore', comment.updateScore)

module.exports = routes
