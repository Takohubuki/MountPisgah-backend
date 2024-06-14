const express = require('express');
const router = express.Router();
const controller = require('../controller/HolyofHolies');

router.post('/login', controller.login);
router.post('/list_courses', controller.list_courses);

module.exports = router;