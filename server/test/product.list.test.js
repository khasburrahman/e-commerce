const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('GET /product', function () {
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