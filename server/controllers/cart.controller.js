const Cart = require('../models/cart')

class Controller {
  static async create (req, res, next) {
    let user = req.user
    let { product, qty } = req.body
    try {
      let cart = await Cart.create({ user, product, qty })
      res.status(201).json(cart)
    } catch (err) {
      console.log('err creating cart', err)
      next({code: 400, msg: err})
    }
  }


}

module.exports = Controller