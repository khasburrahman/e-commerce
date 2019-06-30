const { db_url, db_name } = require('../config/mongo.config')
const mongoose = require('mongoose')

function connect() {
  mongoose.connect(db_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    dbName: db_name
  }, function (error) {
    if (error) {
      console.log(error)
      throw new Error('database tidak konek')
    } else {
      console.log('database connected')
    }
  })
}

module.exports = connect