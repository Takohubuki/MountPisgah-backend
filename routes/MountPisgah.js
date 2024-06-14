const express = require('express');
const router = express.Router();
const controller = require('../controller/MountPisgah');

router.post('/list_course', controller.list_course);

module.exports = router;