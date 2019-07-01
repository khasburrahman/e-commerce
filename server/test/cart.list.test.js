const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testHelper = require('./helper/test.db.helper')

describe('GET /cart', function () {
  let token
  let products
  let cart
  before(async function () {
    products = await testHelper.initProduct()
    cart = await testHelper.initCart(products[0], 1)
    token = await testHelper.getToken('test@test.com')
  })

  it('successfully get list of carts', async function () {
    return req
      .get('/cart')
      .set('token', token)
      .expect(200)
      .then(res => {
        let body = res.body
        chai.expect(body).is.instanceOf(Array)
        chai.expect(body.length).is.greaterThan(0)
      })
  })
})