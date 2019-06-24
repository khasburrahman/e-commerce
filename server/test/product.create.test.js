const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('POST /product', function() {
    let token

    it('successfully create a product', async function() {
        return req
            .post('/product')
            .set('token', token)
            .field('name', 'barang test')
            .field('price', 32000)
            .field('description', 'yooo ini deskripsi')
            .attach('image', __dirname + 'assets/test.jpg')
            .expect(201)
            .then(res => {
                let body = res.body
                chai.expect(body).to.have.property('image')
                chai.expect(body).to.have.property('price', 32000)
                chai.expect(body).to.have.property('name', 'barang test')
                chai.expect(body).to.have.property('description', 'yooo ini deskripsi')
                chai.expect(body.image).not.empty()
            })
    })

    it('failed to create a product image required', async function() {
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


    
    it('failed to create a product name required', async function() {
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

    it('failed to create a product price required', async function() {
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

    it('failed to create a product description required', async function() {
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
})