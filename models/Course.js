class Course {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        this.title = '';
        this.content = '';
        this.audio = '';
        this.ppt = '';
        this.series = '';
        this.publish_date = '';
    }

    async getOneCourse(id) {
        try {
            const course = await this.mongoClient.findOneById('course', id);
            console.log(`Retrieved course: ${course.title}`);
            return course;
        } catch (e) {
            console.error(`Failed to get course: ${e}`);
            throw e;
        }
    }

    async getOneCourseByTitleAndSeries(title, series) {
        try {
            const course = await this.mongoClient.findOne('course', { title, series });
            console.log(`Retrieved course: ${course.title}`);
        } catch (e) {
            console.error(`Failed to get course: ${e}`);
            throw e;
        }
    }

    async getCourses(filter = {}, options = {}) {
        try {
            const courses = await this.mongoClient.find('course', filter, options);
            console.log(`Retrieved all courses`);
            return courses;
        } catch (e) {
            console.error(`Failed to get all courses: ${e}`);
            throw e;
        }
    }

    async publishCourse(course) {
        try {
            const result = await this.mongoClient.insertOne('course', course);
            console.log(`Published course: ${result.title}`);
            return result;
        } catch (e) {
            console.error(`Failed to publish course: ${e}`);
            throw e;
        }
    }

    async updateOneCourse(course) {
        try {
            const result = await this.mongoClient.updateOne('course', { title: course.title, series: course.series }, course);
            console.log(`Updated course: ${course.title}`);
            return course;
        } catch (e) {
            console.error(`Failed to update course: ${e}`);
            throw e;
        }
    }

    async deleteOneCourse(delete_filter) {
        try {
            const result = await this.mongoClient.deleteOne('course', delete_filter);
            console.log(`Deleted course: ${delete_filter.title}`);
            return result;
        } catch (e) {
            console.error(`Failed to delete course: ${e}`);
            throw e;
        }
    }
}

module.exports = Course;