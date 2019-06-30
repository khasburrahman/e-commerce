const User = require('../../models/user')
const jwt = require('../../helpers/jwt.helper')

function initUser () {
  return User.create({ 
    email: 'test@test.com',
    password: 'test',
    fullName: 'test user'
  })
}

function removeUser () {
  if (process.env.NODE_ENV === 'test') {
    return User.deleteMany({}).exec()
  }
}

async function getToken (email) {
  try {
    let user = await User.findOne({email}).exec()
    return jwt.sign({ user: user._id })
  } catch (err) {
    console.log('get token test db helper error:', err)
  }
}

module.exports = {
  initUser,
  removeUser,
  getToken
}