const ObjectId = require('mongodb').ObjectID
const PostModel = require('./../models').post
const postController = {}

postController.create = (req, res) => {
  const post = new PostModel(req.body)
  req.app.db.collection('posts').insertOne(post, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

postController.getAll = (req, res) => {
  req.app.db.collection('posts').find().toArray((err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

postController.show = (req, res) => {
  req.app.db.collection('posts')
  .find({'_id': ObjectId(req.query.id)})
  .toArray((err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else {
      req.app.db.collection('comments')
      .find({'post_id': ObjectId(req.query.id)})
      .toArray((err, results) => {
        if (err) res.json({'status': 'fail', 'data': {'post': result[0], 'comments': err}})
        else res.json({'status': 'success', 'data': {'post': result[0], 'comments': results}})
      })
    }
  })
}

postController.delete = (req, res) => {
  req.app.db.collection('posts')
  .deleteOne({
    '_id': ObjectId(req.body.id)
  }, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

postController.update = (req, res) => {
  req.app.db.collection('posts')
  .updateOne({ '_id': ObjectId(req.body.id) }, {$set: req.body.values}, (err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

postController.getMyPosts = (req, res) => {
  req.app.db.collection('posts')
  .find({'author_id': ObjectId(req.query.id)})
  .toArray((err, result) => {
    if (err) res.json({'status': 'fail', 'data': err})
    else res.json({'status': 'success', 'data': result})
  })
}

postController.updateScore = (req, res) => {
  req.app.db.collection('posts')
  .updateOne({'_id': ObjectId(req.body.id)}, {$set: {'score': req.body.score}}, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = postController
