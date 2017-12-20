class Post {
   constructor(obj) {
       this.title = obj.title,
       this.link = obj.link,
       this.text = obj.text,
       this.author = obj.author,
       this.time = obj.time,
       this.score = 0
   }
}

module.exports = Post