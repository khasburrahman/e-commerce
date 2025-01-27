const supertest = require('supertest')
const chai = require('chai')
const app = require('../app')
const req = supertest(app)

describe('POST /user/register', function () {
  it('successful register attempt', async function () {
    return req
      .post('/user/register')
      .send({ fullName: 'new user', email: 'newuser@test.com', password: 'test' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        let body = res.body
        chai.expect(body).to.have.property('_id')
        chai.expect(body).to.have.property('fullName', 'new user')
        chai.expect(body).to.have.property('email', 'newuser@test.com')
        chai.expect(body).to.have.property('password')
        chai.expect(body.password).to.not.eq('test')
        chai.expect(body.password).not.empty
        chai.expect(body._id).not.empty
      })
  })

  it('failed register attempt with wrong email', async function () {
    return req
      .post('/user/register')
      .send({ email: 'testsalah', fullName: 'new user', password: 'test' })
      .expect(400)
      .then(res => {
        let errorText = res.text
        chai.expect(errorText).to.eq(`Users validation failed: email: testsalah is not a valid email address!`)
      })
  })


  it('failed register attempt with empty params', async function () {
    return req
      .post('/user/register')
      .send({})
      .expect(400)
      .then(res => {
        let errorText = res.text
        chai.expect(errorText).to.eq('Users validation failed: email: Path `email` is required., password: Path `password` is required., fullName: Path `fullName` is required.')
      })
  })

  it('failed register attempt with only fullName params', async function () {
    return req
      .post('/user/register')
      .send({ fullName: 'new user' })
      .expect(400)
      .then(res => {
        let errorText = res.text
        chai.expect(errorText).to.match(/is required/i)
      })
  })

  it('failed register attempt with only email params', async function () {
    return req
      .post('/user/register')
      .send({ email: 'test@onlyemailparams.com' })
      .expect(400)
      .then(res => {
        let errorText = res.text
        chai.expect(errorText).to.match(/is required/i)
      })
  })

  it('failed register attempt with only password params', async function () {
    return req
      .post('/user/register')
      .send({ password: 'test' })
      .expect(400)
      .then(res => {
        let errorText = res.text
        chai.expect(errorText).to.match(/is required/i)
      })
  })
})