const Sequelize = require('sequelize');
// import env
require('dotenv/config')

// connect sequelize with db
const sequelize = new Sequelize(
    database= process.env.DB_NAME,
    username= process.env.DB_USER,
    password= process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
)

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Add note to ORM Sequelize
db.note = require("../models/notes.models")(sequelize, Sequelize);
module.exports = db