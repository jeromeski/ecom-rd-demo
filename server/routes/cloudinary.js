const express = require('express');

const router = express.Router();

const { upload } = require('../controllers/cloudinary');

router.post('/uploadImage', upload);

module.exports = router;
