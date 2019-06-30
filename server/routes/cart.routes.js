const router = require('express').Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../middleware/token.middleware')

router.post('/', authMiddleware, cartController.create)

module.exports = router
