const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('POST /product', function () {
    let token
    let productId

    it('successfully remove a product', async function () {
        return req
            .delete(`/product/${productId[0]}`)
            .set('token', token)
            .expect(200)
            .then(res => {
                let body = res.body
                chai.expect(body).to.have.property('_id')
                chai.expect(body._id).not.empty()
            })
    })

    it('failed to create a product token required', async function () {
        return req
            .delete(`/product/${productId[1]}`)
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/token required/i)
            })
    })

    it('failed to create a product token wrong', async function () {
        return req
            .delete(`/product/${productId[1]}`)
            .set('token', 'token salah')
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/invalid token/i)
            })
    })
    
})