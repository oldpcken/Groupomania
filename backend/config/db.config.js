// in /config/db.config.js

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "database": process.env.DB_NAME,
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "HOST": "localhost",
  "PORT": "5432",
  "dialect": "postgres", 
};