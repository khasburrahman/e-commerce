const { Storage } = require('@google-cloud/storage');

/**
  * Get public URL of a file. The file must have public access
  * @param {string} bucketName
  * @param {string} fileName
  * @return {string}
  */
getPublicUrl = (bucketName, fileName) => `https://storage.googleapis.com/${bucketName}/${fileName}`;


module.exports = {
  gcsMiddleware: function (req, res, next) {
    if (!req.file) {
      return next();
    }

    const storage = new Storage({ keyFilename: process.env.G_BUCKET_KEY_FILE_NAME });
    const bucketName = process.env.G_BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    const gcsFileName = `badai-content-${Date.now()}-${req.file.originalname}`;
    const file = bucket.file(gcsFileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
      },
    });

    stream.on('error', (err) => {
      req.file.cloudStorageError = err;
      console.log('error file upload', err)
      next(err);
    });

    stream.on('finish', () => {
      req.file.cloudStorageObject = gcsFileName;
      return file.makePublic()
        .then(() => {
          req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
          next();
        });
    });

    stream.end(req.file.buffer);
  }
}