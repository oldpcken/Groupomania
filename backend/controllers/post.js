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

//TODO finish create post with media files

// Create a Post with or without media files
exports.createPost = (req, res, next) => {

    const url = req.protocol + '://' + req.get('host');
    // console.log('The URL is: ', url);
    console.log('Req.file is ', req.file);
    // req.body.post = JSON.parse(req.body.post);

    if (req.file) {
        const parsedPost = JSON.parse(req.body.post)
        console.log(req.file);
        const post = new Post({
            userId: parsedPost.userId,
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
        console.log('post with pic: ', post);
    } else {
        const post = new Post({
            userId: req.body.userId,
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
        console.log('post without pic: ', post);
    }

    // post.save()
    //     .then(() => {
    //         res.status(201).json({
    //             message: 'Post Successfully Created!'
    //         });
    //     })
    //     .catch((error) => {
    //         res.status(400).json({
    //             error: error
    //         });
    //     });
};

// Retrieve A Post
exports.getOnePost = (req, res, next) => {

    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            console.log(res.body.id, res.body.userName, res.body.password);
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
            console.log(res.body.id, res.body.userName, res.body.password);
            res.status(200).json(post);            
        })
        .catch((error) => {
            res.status(404).json({
                error: error
            });
        });
};
