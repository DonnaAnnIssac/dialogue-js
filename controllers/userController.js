const UserModel = require('./../models').user
const userController = {}

userController.post = (req, res) => {
  if(validateName(req)) {
    const user = new UserModel(req.body)
    req.app.db.collection('users').insertOne(user, (err, result) => {
      if (err) throw err
      console.log('Document inserted')
      res.json(result)
    })
  }
  else res.json("This user name exists. Enter another name")
}

const validateName = (req) => {
  req.app.db.collection('users')
  .find({"userName" : req.body.userName})
  .toArray((err, result) => {
    if (err) throw err
    if(result.length === 0) return false
    else return true
  })
}

userController.login = (req, res) => {
  req.app.db.collection('users')
  .find({"userName" : req.body.userName})
  .toArray((err, result) => {
    if (err) throw err
    if (result.length === 0) res.json({"status" : 00, "value": "Invalid User Name"})
    else if (result[0].password !== req.body.password) res.json({"status" : 10, "value" : "Password incorrect"})
    else {
      let userInfo = {}
      userInfo['userName'] = result[0].userName
      userInfo['_id'] = result[0]._id
      res.json({"status" : 11, "value" : userInfo})
    }
  })
}

module.exports = userController
