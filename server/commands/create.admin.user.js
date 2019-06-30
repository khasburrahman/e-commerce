if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config() 
}

const Connect = require('../helpers/mongoose.connect.helper')
const User = require('../models/user') 

Connect()
User.create({
  email: 'admin@admin.com',
  fullName: 'admin',
  isAdmin: true,
  password: 'admin'
})
  .then(() => {
    console.log('created')
    process.exit()
  })
  .catch(err => {
    console.log(err)
    process.exit()
  })