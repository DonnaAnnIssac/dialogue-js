const CommentModel = require('./../models').comment
const commentController = {}

commentController.post = (req, res) => {
  const comment  = new CommentModel(req.body)
  req.app.db.collection('comments').insertOne(comment, (err, result) => {
    if (err) throw err
    console.log('Document inserted')
    res.json(result)
  })
}

module.exports = commentController