const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testHelper = require('./helper/test.db.helper')
const Product = require('../models/product')
const Cart = require('../models/cart')

describe('PATCH /cart', function () {
  let products
  let token
  let cart

  before(async function () {
    token = await testHelper.getToken('test@test.com')
    products = await testHelper.initProduct()
    cart = await testHelper.initCart(products[0])
  })

  it('successfully update qty', async function () {
    return req
      .patch(`/cart/${cart[0]}`)
      .set('token', token)
      .send({ qty: 2 })
      .expect(200)
      .then(async res => {
        let body = res.body
        chai.expect(body).to.have.property('_id')
      })
  })

  it('should udpate stock di product', async function () {
    let product = await Product.findOne({ _id: products[0] }).exec()
    chai.expect(product.stock).to.eq(1)
  })

  it('successfully update qty', async function () {
    return req
      .patch(`/cart/${cart[0]}`)
      .set('token', token)
      .send({ qty: 5 })
      .expect(400)
      .then(async res => {
        let err = res.text
        chai.expect(err).to.eq('stock tidak cukup')
      })
  })

  it('stock tetap sama', async function () {
    let product = await Product.findOne({ _id: products[0] }).exec()
    chai.expect(product.stock).to.eq(1)
  })

})