// in /config/db.config.js

module.exports = {
  "database": `${process.env.DB_NAME}`,
  "username": `${process.env.DB_USERNAME}`,
  "password": `${process.env.DB_PASSWORD}`,
  "HOST": "localhost",
  "PORT": "5432",
  "dialect": "postgres",
  // pool: {
  //     max: 4,
  //     min: 0,
  //     acquire: 30000,
  //     idle: 10000
  // },
  // dialectOptions: {
  //     instanceName: "postgresSQL 15",
  //     domain: "DESKTOP-6VAFKDG"
  // }
};