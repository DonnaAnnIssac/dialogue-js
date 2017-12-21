
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
  })
}

commentController.update = (req, res) => {
  let keys = Object.keys(req.body.values)
  let values = {}
  keys.forEach((key) => {
    values[key] = req.body.values[key]
  })
  req.app.db.collection('comments')
  .updateOne({ "_id" : ObjectId(req.body.id) }, values, (err, result) => {
    if (err) throw err
    console.log('Updated one document')
  })
}

commentController.updateScore = (req, res) => {
  req.app.db.collection('comments')
  .updateOne({"_id" : ObjectId(req.body.id)}, {"score" : req.body.score}, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = commentController