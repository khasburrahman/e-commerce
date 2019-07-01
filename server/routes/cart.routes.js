const router = require('express').Router()
const cartController = require('../controllers/cart.controller')
const authMiddleware = require('../middleware/token.middleware')
const cartAuthorization = require('../middleware/cart.authorization.middleware')

router.get('/', authMiddleware, cartController.list)
router.post('/', authMiddleware, cartController.create)
router.patch('/:id', authMiddleware, cartAuthorization, cartController.updateQty)

module.exports = router
