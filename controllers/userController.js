const UserModel = require('./../models')
const userController = {}

userController.post = (req, res) => {
  const {userName, password} = req.body
  // add validation
  const user = new UserModel({
    userName,
    password
  })
  req.app.db.collection('users').insertOne(user, (err, result) => {
    if (err) throw err
    console.log('Document inserted')
    res.json(result)
  })
}

module.exports = userController
