// in /controllers/user.js

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// // Create New Users
exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                userName: req.body.userName,
                password: hash
            });
            user.save()
                .then(() => {
                    res.status(201).json({
                        message: 'User Successfully Added!'
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

// // Login Existing Users
// exports.login = (req, res, next) => {

//     User.findOne({ email: req.body.email })
//         .then((user) => {
//             if (!user) {
//                 return res.status(401).json({
//                     error: new Error('User Not Found!')
//                 });
//             }
//             bcrypt.compare(req.body.password, user.password)
//                 .then((valid) => {
//                     if (!valid) {
//                         return res.status(401).json({
//                             error: new Error('Incorrect Password!')
//                         });
//                     }
//                     const token = jwt.sign(
//                         { userId: user._id }, 
//                         'RANDOM_TOKEN_SECRET', 
//                         {expiresIn: '24h' });
//                     res.status(200).json({
//                         userId: user._id,
//                         token: token
//                     });
//                 })
//                 .catch((error) => {
//                     res.status(500).json({
//                         error: error
//                     });
//                 });
//         })
//         .catch((error) => {
//             res.status(500).json({
//                 error: error
//             });
//         });
// };