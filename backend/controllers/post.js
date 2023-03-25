// in /controllers/post.js

// const Post = require('../models/post');
// const fs = require('fs');

// // View (get) All Posts
// exports.getAllPosts = (req, res, next) => {

//     Post.find()
//         .then((posts) => {
//             res.status(200).json(posts);
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error
//             });
//         });
// };

// // Create a Post
// exports.createPost = (req, res, next) => {

//     const url = req.protocol + '://' + req.get('host');
    
//     req.body.posting = JSON.parse(req.body.posting);

//     const post = new Post({
//         userId: req.body.post.userId,
//         userName: req.body.post.userName,
//         posting: req.body.post.posting,
//         imageUrl: url + '/images/' + req.file.filename,
//         read: req.body.post.read 
//     });

//     post.save()
//         .then(() => {
//             res.status(201).json({
//                 message: 'Post Successfully Created!'
//             });
//         })
//         .catch((error) => {
//             res.status(400).json({
//                 error: error
//             });
//         });
// };

// // Retrieve A Post
// exports.getOnePost = (req, res, next) => {

//     Post.findOne({_id: req.params.id})
//         .then((sauce) => {
//             res.status(200).json(post);
//         })
//         .catch((error) => {
//             res.status(404).json({
//                 error: error
//             });
//         });
// };

// // Modify A Post With or Without Image Change
// exports.modifyPost = (req, res, next) => {
    
//     let updatedPost = new Posst({_id: req.params._id});

//     Post.findOne({_id: req.params.id})
//         .then((oldPost) => {
//             if (!oldPost) {
//                 return res.status (404).json({
//                     error: new Error('404: Post Not Found!')
//                 });
//             }
//             if (oldPost.userId !== req.auth.userId) {
//                 return res.status (401).json({ 
//                     error: new Error('401: Unauthorized Request!')
//                 });
//             }
//             if (req.file) {
//                 req.body.posting = JSON.parse(req.body.posting);
//                 const url = req.protocol + '://' + req.get('host');
//                 const filename = oldPost.imageUrl.split('/images/')[1];
//                 fs.unlink('images/' + filename, (error) => {
//                     if (error) {
//                         console.log(error);
//                         throw error;
//                     }
//                 });
//                 updatedPost = {
//                     _id: req.params.id,
//                     userId: req.body.post.userId,
//                     userName: req.body.post.userName,
//                     posting: req.body.post.posting,
//                     imageUrl: url + '/images/' + req.file.filename,
//                     read: req.body.post.read,                    
//                 } 
//             } else {
//                 updatedPost = {
//                     _id: req.params.id,
//                     userId: oldPost.userId,
//                     userName: req.body.userName,
//                     posting: req.body.posting,
//                     imageUrl: req.body.imageUrl, 
//                     read: req.body.read,                                          
//                 };
//             }
//             Post.updateOne({_id: req.params.id}, updatedPost)
//                 .then(() => {
//                     res.status(201).json({
//                         message: 'Post Successfully Updated!'
//                     });
//                 })
//                 .catch((error) => {
//                     res.status(400).json({
//                         error: error
//                     });
//                 });
//         });        
       
// };
