const ObjectId = require('mongodb').ObjectID

class Comment {
  constructor (obj) {
    this.link = obj.link
    this.text = obj.text
    this.author = obj.author
    this.author_id = ObjectId(obj.user_id)
    this.post_id = ObjectId(obj.post_id)
    this.upVote = 0
    this.downVote = 0
  }
}

module.exports = Comment
