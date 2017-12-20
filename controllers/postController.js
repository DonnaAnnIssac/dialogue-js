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

module.exports = postController