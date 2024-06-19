const express = require('express');
const router = express.Router();
const controller = require('@controllers/HolyofHolies');

router.post('/login', controller.login);
router.post('/course/list', controller.list_courses);
router.post('/course/publish', controller.publish_course);
router.post('/course/delete', controller.delete_course);
router.post('/course/detail_id', controller.get_one_course_by_id);

module.exports = router;