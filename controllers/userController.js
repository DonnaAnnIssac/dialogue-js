const UserModel = require('./../models').user
const userController = {}

userController.post = (req, res) => {
  // add validation
  const user = new UserModel(req.body)
  req.app.db.collection('users').insertOne(user, (err, result) => {
    if (err) throw err
    console.log('Document inserted')
    res.json(result)
  })
}

module.exports = userController
