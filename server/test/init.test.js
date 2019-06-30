const testDbHelper = require('./helper/test.db.helper')

before(function () {
  return testDbHelper.removeUser()
    .then(() => {
      return testDbHelper.initUser()
    })
})

after(function () {
  return testDbHelper.removeUser()
})