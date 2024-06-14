const MongoUtils = require('../utils/MongoDB');

class User {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
    }

    async getUser(username) {
        try {
            const user = await this.mongoClient.findOne('admin', { username });
            console.log(`Retrieved user: ${user.username}`);
            return user;
        } catch (e) {
            console.error(`Failed to get user: ${e}`);
            throw e;
        }
    }

}

module.exports = User;