const basic = {}

basic.get = (req, res) => {
  res.json({
    'message': 'Welcome to the API'
  })
}

module.exports = basic
