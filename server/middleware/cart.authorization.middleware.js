const Cart = require('../models/cart')

module.exports = async function (req, res, next) {
  let user = req.user
  let { id } = req.params
  if (user) {
    cart = await Cart.findOne({_id: id}).exec()
    if (!cart || cart.user != user) {
      next({ code: 401, msg: 'not authorized' })
    } else {
      next()
    }
  } else {
    next({ code: 401, msg: 'not authorized' })
  }
}