const ObjectId = require('mongodb').ObjectID
const PostModel = require('./../models').post
const postController = {}

postController.create = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    const post = new PostModel(req.body)
    req.app.db.collection('posts').insertOne(post, (err, result) => {
      if (err) throw err
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.getAll = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts').find().toArray((err, result) => {
      if (err) throw err
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.show = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .find({'_id': ObjectId(req.query.id)})
    .toArray((err, result) => {
      if (err) throw err
      else {
        req.app.db.collection('comments')
        .find({'post_id': ObjectId(req.query.id)})
        .toArray((err, results) => {
          if (err) throw err
          else res.json({'status': 'success', 'data': {'post': result[0], 'comments': results}})
        })
      }
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.delete = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .deleteOne({
      '_id': ObjectId(req.body.id)
    }, (err, result) => {
      if (err) throw err
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.update = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .updateOne({ '_id': ObjectId(req.body.id) }, {$set: req.body.values}, (err, result) => {
      if (err) throw err
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.getMyPosts = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .find({'author_id': ObjectId(req.query.id)})
    .toArray((err, result) => {
      if (err) res.json({'status': 'fail', 'data': err})
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.upvote = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .updateOne({'_id': ObjectId(req.body.id)}, {$inc: {'upVote': 1}}, (err, result) => {
      if (err) res.json({'status': 'fail', 'data': err})
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

postController.downvote = (req, res) => {
  if (req.session.userName !== undefined && req.session.id !== undefined) {
    req.app.db.collection('posts')
    .updateOne({'_id': ObjectId(req.body.id)}, {$inc: {'downVote': 1}}, (err, result) => {
      if (err) res.json({'status': 'fail', 'data': err})
      else res.json({'status': 'success', 'data': result})
    })
  } else res.json({'status': 'fail', 'data': 'You need to be logged in first'})
}

module.exports = postController
