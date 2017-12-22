
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

commentController.delete = (req, res) => {
  req.app.db.collection('comments')
  .deleteOne({
    "_id" : ObjectId(req.body.id),
    "author_id" : ObjectId(req.body.my_id)
  }, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

commentController.update = (req, res) => {
  req.app.db.collection('comments')
  .updateOne({ "_id" : ObjectId(req.body.id) }, {$set : req.body.values}, (err, result) => {
    if (err) throw err
    console.log('Updated one document')
  })
}

commentController.updateScore = (req, res) => {
  req.app.db.collection('comments')
  .updateOne({"_id" : ObjectId(req.body.id)}, {$set : {"score" : req.body.score}}, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = commentController