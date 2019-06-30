const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)
const testDbHelper = require('./helper/test.db.helper')

describe('POST /product', function () {
  let token 

  before(async function () {
    try {
      token = await testDbHelper.getToken('test@test.com')
    } catch (err) {
      throw new Error(err)
    }
  })

  it.only('successfully create a product', async function () {
    this.timeout(99999)
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('price', 32000)
      .field('stock', 5)
      .field('description', 'yooo ini deskripsi')
      .attach('image', __dirname + '/assets/test.jpg')
      .expect(201)
      .then(res => {
        let body = res.body
        chai.expect(body).to.have.property('image')
        chai.expect(body).to.have.property('price', '32000')
        chai.expect(body).to.have.property('stock', '5')
        chai.expect(body).to.have.property('name', 'barang test')
        chai.expect(body).to.have.property('description', 'yooo ini deskripsi')
        chai.expect(body.image).not.empty
      })
  })

  it('failed to create a product image required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('price', 32000)
      .field('description', 'yooo ini deskripsi')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/is required/i)
      })
  })



  it('failed to create a product name required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('price', 32000)
      .field('description', 'yooo ini deskripsi')
      .attach('image', __dirname + 'assets/test.jpg')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/is required/i)
      })
  })

  it('failed to create a product price required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('description', 'yooo ini deskripsi')
      .attach('image', __dirname + 'assets/test.jpg')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/is required/i)
      })
  })

  it('failed to create a product description required', async function () {
    return req
      .post('/product')
      .set('token', token)
      .field('name', 'barang test')
      .field('price', 32000)
      .attach('image', __dirname + 'assets/test.jpg')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/is required/i)
      })
  })

  it('failed to create a product token required', async function () {
    return req
      .post('/product')
      .field('price', 32000)
      .attach('image', __dirname + 'assets/test.jpg')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/token required/i)
      })
  })

  it('failed to create a product token wrong', async function () {
    return req
      .post('/product')
      .set('token', 'token salah')
      .expect(400)
      .then(res => {
        let body = res.body
        chai.expect(body).to.throw(/invalid token/i)
      })
  })
})