const supertest = require('supertest')
const chai = require('chai')
const sinon = require('sinon')
const testDbHelper = require('./helper/test.db.helper')
let app, req, gcsBucketMiddleware

describe('PATCH /product', function () {
  let token
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
    products = await testDbHelper.initProduct()
  })

  it.only('successfully update a product', async function () {
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

  it('not authorized to update', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('price', 32000)
      .field('description', 'yooo ini deskripsi')
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/is required/i)
      })
  })

  it('failed to create a product name required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('price', 32000)
      .field('description', 'yooo ini deskripsi')
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/is required/i)
      })
  })

  it('failed to create a product price required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('description', 'yooo ini deskripsi')
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/is required/i)
      })
  })

  it('failed to create a product description required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('price', 32000)
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/is required/i)
      })
  })

  it('failed to create a product token required', async function () {
    return req
      .post('/product')
      .field('price', 32000)
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is required/i)
      })
  })

  it('failed to create a product token wrong', async function () {
    return req
      .post('/product')
      .set('token', 'token salah')
      .expect(400)
      .then(res => {
        let err = res.text
        chai.expect(err).to.match(/token is invalid/i)
      })
  })
})