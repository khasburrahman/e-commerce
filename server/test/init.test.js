const testDbHelper = require('./helper/test.db.helper')

before(function () {
  return testDbHelper.cleanData()
    .then(() => {
      return testDbHelper.initUser()
    })
})

after(function () {
  return testDbHelper.cleanData()
})