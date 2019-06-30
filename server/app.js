if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express() 
const userRoute = require('./routes/user.routes')
const productRoute = require('./routes/product.routes')

const errorMiddleware = require('./middleware/error.middleware')
const mongoConnect = require('./helpers/mongoose.connect.helper')
const PORT = process.env.PORT || 3000

mongoConnect()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/user', userRoute)
app.use('/product', productRoute)
app.use(errorMiddleware)

app.listen(PORT, () => {console.log('App jalan di:', PORT)})
module.exports = app