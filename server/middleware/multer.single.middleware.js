const _multer = require('multer')

const multer = _multer({
  storage: _multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

module.exports = (formName) => multer.single(formName)