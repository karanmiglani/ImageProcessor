const express = require('express');
const router = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' });
const {uploadCsv} = require('../controllers/fileUploadController')

  router.post('/' , upload.single('file') ,uploadCsv)

module.exports = router