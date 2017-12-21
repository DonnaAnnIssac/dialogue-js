const ObjectId = require('mongodb').ObjectID
const PostModel = require('./../models').post
const postController = {}

postController.create = (req, res) => {
  const post = new PostModel(req.body)
  req.app.db.collection('posts').insertOne(post, (err, result) => {
    if (err) throw err
    console.log('Document inserted')
    res.json(result)
  })
}

postController.getAll = (req, res) => {
  req.app.db.collection('posts').find().toArray((err, result) => {
    if (err) throw err
    console.log('Retrieved all posts from collection')
    res.json(result)
  })
}

postController.showPost = (req, res) => {
  req.app.db.collection('posts')
  .find({"_id" : ObjectId(req.query.id)})
  .toArray((err, result) => {
    if (err) throw err
    req.app.db.collection('comments')
    .find({"post_id" : ObjectId(req.query.id)})
    .toArray((err, results) => {
      console
      res.json({"post" : result[0], "comments" : results})
    })
  })
}
module.exports = postController