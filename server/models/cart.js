const mongoose = require('mongoose')
const Product = require('./product')
const Schema = mongoose.Schema;
  
const ModelSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  qty: {
    type: Number,
    min: 1,
    required: true
  }
})

ModelSchema.pre('save', async function (next) {
  productId = this.product
  let product = await Product.findOne({ _id: productId }).exec()
  product.stock -= this.qty
  if (product.stock < 0) {
    next('stock product tidak cukup')
  }
  await product.save()
})

const Model = mongoose.model('Carts', ModelSchema)
module.exports = Model