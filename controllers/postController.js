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

postController.show = (req, res) => {
  req.app.db.collection('posts')
  .find({"_id" : ObjectId(req.query.id)})
  .toArray((err, result) => {
    if (err) throw err
    req.app.db.collection('comments')
    .find({"post_id" : ObjectId(req.query.id)})
    .toArray((err, results) => {
      res.json({"post" : result[0], "comments" : results})
    })
  })
}

postController.delete = (req, res) => {
  req.app.db.collection('posts')
  .deleteOne({
    "_id" : ObjectId(req.body.id),
    "author_id" : ObjectId(req.body.my_id)
  }, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

postController.update = (req, res) => {
  req.app.db.collection('posts')
  .updateOne({ "_id" : ObjectId(req.body.id) }, {$set : req.body.values}, (err, result) => {
    if (err) throw err
    console.log('Updated one document')
    res.json(result)
  })
}

postController.getMyPosts = (req, res) => {
  req.app.db.collection('posts')
  .find({"author_id" : ObjectId(req.query.author_id)})
  .toArray((err, result) => {
    if (err) throw err
    console.log('Retrieved all posts from collection')
    res.json(result)
  })
}

postController.updateScore = (req, res) => {
  req.app.db.collection('posts')
  .updateOne({"_id" : ObjectId(req.body.id)}, {$set : {"score" : req.body.score}}, (err, result) => {
    if (err) throw err
    res.json(result)
  })
}

module.exports = postController