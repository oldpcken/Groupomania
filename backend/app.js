// in /backend/app.js

const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const dbConfig = require('./config/db.config');
const Sequelize = require('sequelize');
// const tedious = require('tedious');

const app = express();
dotenv.config();

// Connection to Postgres database
const sequelize = new Sequelize('dbConfig.database', 'dbConfig.username', 'dbConfig.password', 
    {
      host: dbConfig.HOST,
      port: dbConfig.PORT,
      dialect: dbConfig.dialect,
//       pool: {
//           max: dbConfig.pool.max,
//           min: dbConfig.pool.min,
//           idle: dbConfig.pool.idle,
//       },
//   dialectOptions: {
//       instanceName: dbConfig.dialectOptions.instanceName,
//       domain: dbConfig.dialectOptions.domain
//   }
    });

sequelize.authenticate()
    .then(() => {
        console.log('Connection Successful')
    })
    .catch((error) => {
        console.log('Unable to Connect to Database, ', error)

    });

app.use(express.json());

// set up cross-origin resource sharing
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// app.use('/api/posts', postRoutes);
// app.use('/api/auth', userRoutes);

module.exports = app;