const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT || 8000,
    db: {
        url: process.env.DATABASE_URL,
        name: 'MountPisgah'
    }
};