const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const ModelSchema = Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  price: {
    type: Number,
    min: 1,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    min: 1,
    required: true,
  },
  description: {
    type: String,
    required: true
  }
})

const Model = mongoose.model('Products', ModelSchema)
module.exports = Model