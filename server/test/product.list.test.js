const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testHelper = require('./helper/test.db.helper')

describe('GET /product', function () {
  before(async function () {
    await testHelper.initProduct()
  })
  
  it('successfully get list of products', async function () {
    return req
      .get('/product')
      .expect(200)
      .then(res => {
        let body = res.body
        chai.expect(body).is.instanceOf(Array)
        chai.expect(body.length).is.greaterThan(0)
      })
  })
})