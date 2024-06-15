const express = require('express');
const router = express.Router();
const controller = require('../controller/HolyofHolies');

router.post('/login', controller.login);
router.post('/course/list', controller.list_courses);
router.post('/course/publish', controller.publish_course);
router.post('/course/delete', controller.delete_course);

module.exports = router;