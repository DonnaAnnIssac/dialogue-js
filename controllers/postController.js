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

module.exports = postController