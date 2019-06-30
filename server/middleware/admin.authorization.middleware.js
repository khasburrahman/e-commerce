const User = require('../models/user')

module.exports = async function (req, res, next) {
  let userId = req.user
  if (userId) {
    let user = await User.findOne({ _id: userId }).exec()
    if (user.isAdmin) {
      next()
    } else {
      console.log("not authorized")
      next({code: 401, msg: "not authorized"})
    }
  } else {
    console.log("not authorized")
    next({code: 401, msg:"not authorized"})
  }
}