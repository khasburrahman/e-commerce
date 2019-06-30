const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testHelper = require('./helper/test.db.helper')
const Product = require('../models/product')

describe('POST /cart', function () {
  let products
  let token

  before(async function () {
    token = await testHelper.getToken('test@test.com')
    products = await testHelper.initProduct()
  })

  it('successfully add to cart', async function () {
    return req
      .post('/cart')
      .set('token', token)
      .send({ product: products[0], qty: 1 })
      .expect(201)
      .then(async res => {
        let body = res.body
        chai.expect(body).to.have.property('_id')
      })
  })

  it('should mengurangi stock di product', async function () {
    let product = await Product.findOne({ _id: products[0] }).exec()
    chai.expect(product.stock).to.eq(2)
  })

  it('stock product tidak mencukupi', async function () {
    return req
      .post('/cart')
      .set('token', token)
      .send({ product: products[0], qty: 6 })
      .expect(400)
      .then(async res => {
        let err = res.text
        chai.expect(err).to.eq('stock product tidak cukup')
      })
  })

  it('fail add to cart token required', async function () {
    return req
      .post('/cart')
      .send({ product: products[0], qty: 1 })
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is required/i)
      })
  })
})