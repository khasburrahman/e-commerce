const User = require('../../models/user')
const Product = require('../../models/product')
const jwt = require('../../helpers/jwt.helper')

function initUser () {
  return User.create({ 
    email: 'test@test.com',
    password: 'test',
    fullName: 'test user'
  })
}

function cleanData () {
  if (process.env.NODE_ENV === 'test') {
    let user = User.deleteMany({}).exec()
    let product = Product.deleteMany({}).exec()
    return Promise.all([user, product])
  }
}

async function getToken (email) {
  try {
    let user = await User.findOne({email}).exec()
    return jwt.sign({ user: user._id })
  } catch (err) {
    console.log('get token test db helper error:', err)
  }
}

async function initProduct () {
  let product = await Product.create({ name: 'test', price: 2000, image: 'test.jgp', stock: 3, description: 'test ' })
  let product2 = await Product.create({ name: 'test', price: 2000, image: 'test.jgp', stock: 3, description: 'test ' })
  productId = [product._id, product2._id]
  return productId
}

module.exports = {
  initUser,
  cleanData,
  getToken,
  initProduct
}