const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('POST', function() {
    let product
    let token

    it('successfully add to cart', async function(){
        return req
            .post('/cart')
            .set('token', token)
            .send({product, qty})
            .expect(200)
            .then(res => {
                let body = res.body
                chai.expect(body).to.have.property('_id')
            })
    })

    it('fail add to cart token required', async function(){
        return req
            .post('/cart')
            .send({product, qty})
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/token required/i)
            })
    })
})