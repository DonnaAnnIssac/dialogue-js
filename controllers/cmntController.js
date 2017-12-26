const ObjectId = require('mongodb').ObjectID
const CommentModel = require('./../models').comment
const commentController = {}

commentController.create = (req, res) => {
  const comment = new CommentModel(req.body)
  req.app.db.collection('comments').insertOne(comment, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

commentController.delete = (req, res) => {
  req.app.db.collection('comments')
  .deleteOne({
    '_id': ObjectId(req.body.id)
  }, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

commentController.update = (req, res) => {
  req.app.db.collection('comments')
  .updateOne({ '_id': ObjectId(req.body.id) }, {$set: req.body.values}, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

commentController.updateScore = (req, res) => {
  req.app.db.collection('comments')
  .updateOne({'_id': ObjectId(req.body.id)}, {$set: {'score': req.body.score}}, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = commentController
