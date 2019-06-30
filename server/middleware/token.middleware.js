const jwt = require('../helpers/jwt.helper')

module.exports = function (req, res, next) {
  let token = req.headers.token
  if (token) {
    try {
      jwt.verify(token)
      next()
    } catch (err) {
      next({ code: 400, msg: 'token is invalid'})
    }
  } else {
    next({ code: 400, msg: 'token is required' })
  }
}