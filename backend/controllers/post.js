// in /controllers/post.js

const { Post } = require('../models');
const fs = require('fs');

// View (get) All Posts
exports.getAllPosts = (req, res, next) => {

    Post.findAll({ order: [['createdAt', 'DESC']] })
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
            usersRead: []
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
            usersRead: []
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
exports.markPostRead = (req, res, next) => {

    Post.findOne({ where: { id: req.params.id } })
        .then((post) => {
            const readId = req.body.userId;
            const alreadyRead = post.usersRead.includes(readId);

            if (alreadyRead) {
                // don't push to array
                res.status(304).json({ message: 'Post Already Read!' });
                console.log('User has already read the post!')
            } else {
                // Add userId to the usersRead array!
                post.update({ usersRead: [...post.usersRead, readId] })
                    .then((post) => {
                        post.save()
                            .then((post) => {
                                console.log('User has now read the post!')
                                res.status(200).json(post);
                            });
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: error.message || error
            });
        });
};
