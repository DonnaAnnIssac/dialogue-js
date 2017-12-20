class User {
  constructor (obj) {
    this.userName = obj.userName
    this.password = obj.password
  }
}
// add encryption for password

module.exports = User
