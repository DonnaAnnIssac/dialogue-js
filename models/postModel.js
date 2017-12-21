class Post {
   constructor(obj) {
       this.title = obj.title,
       this.link = obj.link,
       this.text = obj.text,
       this.author = obj.author,
       this.score = 0
   }
}

module.exports = Post