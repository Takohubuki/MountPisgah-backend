const User = require('@models/User');
const Course = require('@models/Course');
const config = require('@config/config');

const MongoUtils = require('@utils/MongoDB');
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
        let filter = req.body.filter || {};
        const options = {
            page: req.body.page || 1,
            itemsPerPage: req.body.itemsPerPage || 10,
            sortBy: req.body.sortBy || 'title',
        }

        if (filter.title === '' && filter.series === '') {
            filter = {};
        }

        const courses = await course_client.getCourses(filter, {});
        res.status(200).send({ courses: courses, len: courses.length });
    }catch (e) {
        console.error(`Failed to list courses: ${e}`);
        res.status(500).send('Internal server error');
    }
};

const publish_course = async (req, res) => {
    try {
        const course = req.body;
        await course_client.publishCourse(course);
        res.status(200).send('Course published');
    } catch (e) {
        console.error(`Failed to publish course: ${e}`);
        res.status(500).send('Internal server error');
    }
}

const delete_course = async (req, res) => {
    try {
        const delete_filter = req.body;
        await course_client.deleteOneCourse(delete_filter);
        res.status(200).send('Course deleted');
    } catch (e) {
        console.error(`Failed to delete course: ${e}`);
        res.status(500).send('Internal server error');
    }
}

const get_one_course_by_id = async (req, res) => {
    try {
        const { id } = req.body;
        const course = await course_client.getOneCourse(id);
        res.status(200).send(course);
    } catch (e) {
        console.error(`Failed to get course by id: ${e}`);
        res.status(500).send('Internal server error');
    }

}

module.exports = {
    login,
    list_courses,
    publish_course,
    delete_course,
    get_one_course_by_id
};