const ObjectId = require('mongodb').ObjectID

class Post {
   constructor(obj) {
       this.title = obj.title,
       this.link = obj.link,
       this.text = obj.text,
       this.author = obj.author,
       this.author_id = ObjectId(obj.author_id),
       this.score = 0
   }
}

module.exports = Post