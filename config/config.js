require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        'user_profile',
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            host: 'hngomrlb3vfq3jcr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com	',
            dialect: 'mysql'
        }
    );

module.exports = sequelize;













