const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testHelper = require('./helper/test.db.helper')
const Product = require('../models/product')
const Cart = require('../models/cart')

describe('DELETE /cart', function () {
  let products
  let token
  let carts

  before(async function () {
    token = await testHelper.getToken('test@test.com')
    products = await testHelper.initProduct()
    carts = await testHelper.initCart(products[0], 1)
  })

  it('successfully delete a cart', async function () {
    return req
      .delete(`/cart/${carts[0]}`)
      .set('token', token)
      .expect(200)
      .then(res => {
        let body = res.body
        chai.expect(body).to.have.property('_id')
      })
  })

  it('should readd the stock to product', async function () {
    let cart = await Cart.findOne({_id: carts[0]}).exec()
    let product = await Product.findOne({_id: cart.product}).exec()
    chai.expect(product.stock).to.eq(3)
  })

  it('failed to delete a cart invalid id', async function () {
    return req 
      .delete(`/cart/${products[0]}`)
      .set('token', token)
      .expect(404)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/not found/i)
      })
  })

  it('faled to delete a cart invalid token', async function () {
    return req 
      .delete(`/cart/${carts[0]}`)
      .set('token', token)
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is invalid/i)
      })
  })

  it('failed to delete a cart missing token', async function () {
    return req
      .delete(`/cart/${carts[0]}`)
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is required/i)
      })
  })
})