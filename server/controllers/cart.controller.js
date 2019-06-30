const Cart = require('../models/cart')
const Product = require('../models/product')

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

  static async updateQty (req, res, next) {
    let { id } = req.params
    let { qty } = req.body
    try {
      let cart = await Cart.findOne({ _id: id }).exec()
      let product = await Product.findOne({ _id: cart.product }).exec()
      if (qty > product.stock + cart.qty) {
        throw new Error('stock tidak cukup')
      }
      product.stock += cart.qty
      await product.save()
      cart.qty = qty
      await cart.save()
      res.json(cart)
    } catch (err) {
      console.log('update cart error', err)
      next({code:400, msg: err.message})
    }
  }
}

module.exports = Controller