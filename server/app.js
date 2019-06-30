if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})
console.log({env: process.env.NODE_ENV})

const express = require('express')
const app = express() 
const userRoute = require('./routes/user.routes')
const errorMiddleware = require('./middleware/error.middleware')
const mongoConnect = require('./helpers/mongoose.connect.helper')
const PORT = process.env.PORT || 3000

mongoConnect()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRoute)
app.use(errorMiddleware)

app.listen(PORT, () => {console.log('App jalan di:', PORT)})
module.exports = app