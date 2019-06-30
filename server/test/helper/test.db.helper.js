const User = require('../../models/user')

function initUser () {
  return User.create({ 
    email: 'test@test.com',
    password: 'test',
    fullName: 'test user'
  })
}

function removeUser() {
  if (process.env.NODE_ENV === 'test') {
    return User.deleteMany({}).exec()
  }
}

module.exports = {
  initUser,
  removeUser
}