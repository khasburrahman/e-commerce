const supertest = require('supertest')
const chai = require('chai')
const sinon = require('sinon')
const testDbHelper = require('./helper/test.db.helper')
let app, req, gcsBucketMiddleware

describe('PATCH /product', function () {
  let token
  let userToken
  let products

  before(async function () {
    gcsBucketMiddleware = require('../middleware/gcs.bucket.middleware')
    sinon.stub(gcsBucketMiddleware, 'gcsMiddleware')
      .callsFake(function (req, res, next) {
        req.file = {}
        req.file.gcsUrl = 'fakefile.jpg'
        return next()
      })
    app = require('../app')
    req = supertest(app)
    token = await testDbHelper.getToken('admin@test.com')
    userToken = await testDbHelper.getToken('test@test.com')
    products = await testDbHelper.initProduct()
  })

  it('successfully update a product', async function () {
    return req
      .patch(`/product/${products[0]}`)
      .set('token', token)
      .field('name', 'barang update')
      .field('stock', 10)
      .expect(200)
      .then(res => {
        let body = res.body
        chai.expect(body).to.have.property('image')
        chai.expect(body).to.have.property('stock', 10)
        chai.expect(body).to.have.property('name', 'barang update')
        chai.expect(body).to.have.property('description', 'test')
        chai.expect(body.image).not.empty
      })
  })

  it('update with invalid stock number', async function () {
    return req
      .patch(`/product/${products[0]}`)
      .set('token', token)
      .field('name', 'barang update')
      .field('stock', -1)
      .expect(400)
      .then(res => {
        let body = res.text
        chai.expect(body).to.match(/is less than minimum/i)
      })
  })

  it('update with invalid price', async function () {
    return req
      .patch(`/product/${products[0]}`)
      .set('token', token)
      .field('name', 'barang update')
      .field('price', -1)
      .expect(400)
      .then(res => {
        let body = res.text
        chai.expect(body).to.match(/is less than minimum/i)
      })
  })

  it('not authorized to update', async function () {
    return req
      .patch(`/product/${products[0]}`)
      .set('token', userToken)
      .field('name', 'barang test')
      .field('price', 32000)
      .field('description', 'yooo ini deskripsi')
      .expect(401)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/not authorized/i)
      })
  })
})