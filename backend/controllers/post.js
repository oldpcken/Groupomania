// in /controllers/post.js

const { Post } = require('../models');
const fs = require('fs');

// View (get) All Posts
exports.getAllPosts = (req, res, next) => {

    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });
};

// Create a Post with or without media files
exports.createPost = (req, res, next) => {

    const url = req.protocol + '://' + req.get('host');
    
    if (req.file) {
        const parsedPost = JSON.parse(req.body.post);
        const post = new Post({
            userId: parsedPost.userId,
            title: parsedPost.title,
            message: parsedPost.message,
            mediaUrl: url + '/images/' + req.file.filename,
            userRead: [] 
        });
        post.save()
        .then(() => {
            res.status(201).json({
                message: 'Post Successfully Created!'
            });
        })
        .catch((error) => {
            res.status(400).json({
                error: error
            });
        });             
    } else {
        const post = new Post({
            userId: req.body.userId,
            title: req.body.title,
            message: req.body.message,
            userRead: []
        });
        post.save()
            .then(() => {
                res.status(201).json({
                    message: 'Post Successfully Created!'
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error: error
                });
            });
    }
};

// Retrieve A Post
exports.getOnePost = (req, res, next) => {

    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            res.status(200).json(post);            
        })
        .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
};

// Mark a Post Read By a User
//TODO add controller to mark a post read
exports.markPostRead = (req, res, next) => {

    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            res.status(200).json(post); 
            // Add userId to the usersRead array!
            // const post = new Post({
            //     userRead: req.body.usersRead
        })
        .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
};
