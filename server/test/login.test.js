const supertest = require('supertest')
const chai = require('chai')
const testDbHelper = require('./helper/test.db.helper')
const app = require('../app')
const req = supertest(app)

before(function () {
  return testDbHelper.removeUser()
    .then(() => {
      return testDbHelper.initUser()
    })
})

after(function () {
  return testDbHelper.removeUser()
})

describe('POST /user/login', function() {
    it('successful login attempt', async function () {
        return req
            .post('/user/login')
            .send({email: 'test@test.com', password:'test'})
            .expect(200)
            .expect('Content-Type', /json/)
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
                let errorText = res.text
                chai.expect(errorText).to.eq('invalid email / pass')
            })
    })

    it('failed login attempt with wrong password', async function () {
        return req
            .post('/user/login')
            .send({ email: 'test@test.com', password: 'testsalah' })
            .expect(400)
            .then(res => {
                let errorText = res.text
                chai.expect(errorText).to.eq('invalid email / pass')
            })
    })
})