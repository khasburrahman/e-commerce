const router = require('express').Router()
const productController = require('../controllers/product.controller')
const authMiddleware = require('../middleware/token.middleware')
const multerMemoryStorage = require('../middleware/multer.single.middleware')
const gcsUploadHelper = require('../middleware/gcs.bucket.middleware')

router.get('/', productController.get)
router.post('/', authMiddleware, multerMemoryStorage('image'), gcsUploadHelper, productController.create)
router.patch('/:id', authMiddleware, productController.update)
router.delete('/:id', authMiddleware, productController.delete)

module.exports = router