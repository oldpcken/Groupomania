// in /controllers/user.js

const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create New Users on Postgres Database
exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                userName: req.body.userName,
                password: hash                
            });
            console.log('User', req.body.userName);
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'User ' + req.body.userName + ' Successfully Added!'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        });
};

// Login Existing Users to Postgres Database
exports.login = (req, res, next) => {

    User.findOne({ where: { userName: req.body.userName } })
        .then((userName) => {
            if (!userName) {
                console.log('status 401 path');
                return res.status(401).json({
                    error: new Error('User Not Found!')
                });
            }
            console.log(req.body.userName);
            console.log(req.body.password);
            console.log(userName.password);
            bcrypt.compare(req.body.password, userName.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect Password!')
                        });
                    }
                    const token = jwt.sign(
                        { userId: user._id }, 
                        'RANDOM_TOKEN_SECRET', 
                        {expiresIn: '24h' });
                    res.status(200).json({
                        userId: user._id,
                        token: token
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        error: error
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                error: error
            });
        });
};

// Delete User From the Postgres Database

exports.delete = (req, res, next) => {

    User.findOne({ where: { id: req.params.id } })
        .then((user) => {
            if (!user) {
                return res.status (404).json({
                    error: new Error('404: User Not Found!')
                });
            }
            if ( !req.params.id ) {
                return res.status(401).json({
                    error: new Error('401: Unauthorized Request!')
                })
            }
            User.destroy({ where: { id: req.params.id } })
                .then(() => {
                    res.status(200).json({
                        message: 'The User Has Been Deleted!'
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({
                        error: error                        
                    });                    
                });
        
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({                
                error: error
            });
        });
};