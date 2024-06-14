const User = require('../model/user');
const config = require('../config/config');

const MongoUtils = require('../utils/MongoDB');
const mongoClient = new MongoUtils(config.db.url, config.db.name);

mongoClient.connect();

const user_client = new User(mongoClient);

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

module.exports = {
    login
};