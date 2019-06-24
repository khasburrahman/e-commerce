const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('/user/login', function() {
    it('successful login attempt', async function () {
        return req
            .post('/user/login')
            .send({email: 'test@test.com', password:'test'})
            .expect(200)
            .expect('Content-Typ e', /json/)
            .then(res => {
                let body = res.body
                chai.expect(body).to.have.property('access_token')
            })
    })

    it('failed login attempt with wrong username', async function() {
        return req
            .post('/user/login')
            .send({email: 'testsalah@test.com', password: 'test'})
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/username \/password invalid/i)
            })
    })
})