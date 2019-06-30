const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const Product = require('../models/product')
const testHelper = require('./helper/test.db.helper')

describe('DELETE /product', function () {
  let token
  let productId

  before(async function () {
    token = await testHelper.getToken('test@test.com')
    productId = await testHelper.initProduct()
  })

  it('successfully remove a product', async function () {
    return req
      .delete(`/product/${productId[0]}`)
      .set('token', token)
      .expect(200)
      .then(res => {
        let body = res.body
        chai.expect(body).to.have.property('ok', 1)
        chai.expect(body).to.have.property('n', 1)
        chai.expect(body).to.have.property('deletedCount', 1)
      })
  })

  it('failed to remove a product token required', async function () {
    return req
      .delete(`/product/${productId[1]}`)
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is required/i)
      })
  })

  it('failed to remove a product id salah', async function () {
    return req
      .delete(`/product/${productId[0]}`)
      .set('token', token)
      .expect(404)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/not found/i)
      })
  })

})