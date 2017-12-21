const UserModel = require('./../models').user
const userController = {}

userController.post = (req, res) => {
  // add validation
  if(!validateName(req.body)) res.json("This user name exists. Enter another name")

  const user = new UserModel(req.body)
  req.app.db.collection('users').insertOne(user, (err, result) => {
    if (err) throw err
    console.log('Document inserted')
    res.json(result)
  })
}

const validateName = (body) => {
  req.app.db.collection('users')
  .find({"userName" : body.userName})
  .toArray((err, result) => {
    if (err) throw err
    if(result.length === 0) return true
    else return false
  })
}

userController.login = (req, res) => {
  req.app.db.collection('users')
  .find({"userName" : req.body.userName})
  .toArray((err, result) => {
    if (err) throw err
    if (result.length === 0) res.json("Invalid User Name")
    if (result[0].password !== req.body.password) res.json("Password incorrect")
    else res.json(result)
  })
}

module.exports = userController
