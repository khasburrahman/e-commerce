const router = require('express').Router()
const productController = require('../controllers/product.controller')
const authMiddleware = require('../middleware/token.middleware')
const adminMiddleware = require('../middleware/admin.authorization.middleware')
const multerMemoryStorage = require('../middleware/multer.single.middleware')
const gcsBucketMiddleware = require('../middleware/gcs.bucket.middleware')

router.get('/', productController.get)
router.post('/', authMiddleware, adminMiddleware, multerMemoryStorage('image'), gcsBucketMiddleware.gcsMiddleware, productController.create)
router.patch('/:id', authMiddleware, adminMiddleware, multerMemoryStorage('image'), gcsBucketMiddleware.gcsMiddleware, productController.update)
router.delete('/:id', authMiddleware, adminMiddleware, productController.delete)

module.exports = router