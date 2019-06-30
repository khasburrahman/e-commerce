const Product = require('../models/product')

class Controller {
  static async create (req, res, next) {
    let { name, price, stock, description } = req.body
    try {
      if (req.file && req.file.gcsUrl) {
        let image = req.file.gcsUrl
        let product = await Product.create({ name, price, image, stock, description })
        let { _id } = product
        res.status(201).json({ _id, name, image, price, stock, description })
      } else {
        console.log('not found')
        next({ code: 400, msg: 'featured image is required' })
      }
    } catch (err) {
      console.log('error create', err)
      next(err)
    }
  }

  static async update (req, res, next) {
    let { name, price, stock, description } = req.body
    let id = req.params.id
    try {
      let image = req.file && req.file.gcsUrl
      let product = await Product.findOne({ _id: id }).exec()
      if (name) product.name = name
      if (price) product.price = price
      if (stock) product.stock = stock
      if (description) product.description = description
      if (req.file && req.file.gcsUrl) product.image = req.file && req.file.gcsUrl
      res.json({ 
        _id: id,
        name: product.name,
        image: product.image,
        price: product.price,
        stock: product.stock,
        description: product.description
      })
    } catch (err) {
      console.log('error updating', err)
      next(err)
    }
  }

  static async get (req, res, next) {
    try {
      let products = await Product.find().exec()
      res.json(products)
    } catch (err) {
      console.log(`get product error`, err)
      next(err)
    }
  }

  static async delete (req, res, next) {
    let id = req.params.id
    try {
      let product = await Product.deleteOne({ _id: id }).exec()
      if (product.n === 0) {
        res.status(404).json('not found')
      } else {
        res.json(product)
      }
    } catch (err) {
      console.log(err)
      next(err)
    }
  }
}

module.exports = Controller