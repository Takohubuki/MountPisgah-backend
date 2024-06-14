const User = require('../model/user');
const Course = require('../model/Course');
const config = require('../config/config');

const MongoUtils = require('../utils/MongoDB');
const mongoClient = new MongoUtils(config.db.url, config.db.name);

mongoClient.connect();

const user_client = new User(mongoClient);
const course_client = new Course(mongoClient);

const login = async (req, res) => {
    try {
        const user = await user_client.getUser(req.body.username);

        console.log(`User: ${user}`);

        if (!user) {
            res.status(401).send('Unauthorized');
            return;
        }

        if (user.password !== req.body.password) {
            res.status(401).send('Unauthorized');
            return;
        }

        res.status(200).send('Login successful');
    } catch (e) {
        console.error(`Failed to login: ${e}`);
        res.status(500).send('Internal server error');
    }
};

const list_courses = async (req, res) => {
    try {
        const filter = req.body.filter || {};
        const courses = await course_client.getCourses(filter);
        res.status(200).send({ courses: courses, len: courses.length });
    }catch (e) {
        console.error(`Failed to list courses: ${e}`);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    login,
    list_courses
};