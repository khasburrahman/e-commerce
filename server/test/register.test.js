const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('POST /user/register', function () {
    it('successful register attempt', async function () {
        return req
            .post('/user/register')
            .send({ fullName: 'new user', email: 'newuser@test.com', password: 'test' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                let body = res.body
                chai.expect(body).to.have.property('_id')
                chai.expect(body).to.have.property('fullName', 'new user')
                chai.expect(body).to.have.property('email', 'newuser@test.com')
                chai.expect(body).to.have.property('password')
                chai.expect(body.password).not.empty()
                chai.expect(body._id).not.empty() 
            })
    })

    it('failed register attempt with wrong email', async function () {
        return req
            .post('/user/register')
            .send({ email: 'testsalah', fullName: 'new user', password: 'test' })
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/invalid email/i)
            })
    })


    it('failed register attempt with empty params', async function () {
        return req
            .post('/user/register')
            .send({ })
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/is required/i)
            })
    })

    it('failed register attempt with only fullName params', async function () {
        return req
            .post('/user/register')
            .send({fullName: 'new user'})
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/is required/i)
            })
    })

    it('failed register attempt with only email params', async function () {
        return req
            .post('/user/register')
            .send({email: 'test@onlyemailparams.com'})
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/is required/i)
            })
    })

    it('failed register attempt with only password params', async function () {
        return req
            .post('/user/register')
            .send({password: 'test'})
            .expect(400)
            .then(res => {
                let body = res.body
                chai.expect(body).to.throw(/is required/i)
            })
    })
})