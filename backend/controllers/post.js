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

// // Delete A Post
// exports.deleteSauce = (req, res, next) => {

//     Sauce.findOne({_id: req.params.id})
//         .then((sauce) => {
//             if (!sauce) {
//                 return res.status (404).json({
//                     error: new Error('404: Sauce Not Found!')
//                 });
//             }
//             if (sauce.userId !== req.auth.userId) {
//                 return res.status(401).json({
//                     error: new Error('401: Unauthorized Request!')
//                 })
//             }
//             const filename = sauce.imageUrl.split('/images/')[1];
//             fs.unlink('images/' + filename, () => {
//                 Sauce.deleteOne({_id: req.params.id})
//                     .then(() => {
//                         res.status(200).json({
//                             message: 'Your Sauce Has Been Deleted!'
//                         });
//                     })
//                     .catch((error) => {
//                         res.status(400).json({
//                             error: error
//                         });
//                     });
//             });
        
//         })
//         .catch((error) => {
//             res.status(500).json({ 
//                 error: error
//             });
//         });
// };

// // Like or Dislike Sauce, Track Users
// exports.likeOrDislikeSauce = (req, res, next) => {
        
//     const userId = req.body.userId;
//     const likeRequest = req.body.like;
    
//     Sauce.findOne({ _id: req.params.id})
//         .then((oldSauce) => {
//             if (!oldSauce) {
//                 return res.status (404).json({
//                     error: new Error('404: Sauce Not Found!')
//                 });
//             }
//             // create update object with current sauce values
//             sauceUpdate = {
//                 likes: oldSauce.likes,
//                 dislikes: oldSauce.dislikes,
//                 usersLiked: oldSauce.usersLiked,
//                 usersDisliked: oldSauce.usersDisliked
//             };
            
//             if (likeRequest < -1 || likeRequest > 1) {
//                 return res.status(400).json({ 
//                     message: 'Like Request is Invalid!'
//                 });
//             }

//             const userAlreadyLiked = oldSauce.usersLiked.includes(userId);
//             const userAlreadyDisliked = oldSauce.usersDisliked.includes(userId);

//             // go through conditionals to add or remove likes, add or remove userids from the arrays
//             if (likeRequest === 1 && !userAlreadyLiked) {
//                 sauceUpdate.likes++;                         // add 1 to likes count
//                 sauceUpdate.usersLiked.push(userId);         // add userId to the userLikes array
//              }
//             if (likeRequest === -1 && !userAlreadyDisliked) {
//                 sauceUpdate.dislikes++;                      // add 1 to disLikes count
//                 sauceUpdate.usersDisliked.push(userId);      // add userId to the userDislikes array         
//             }
//             if (likeRequest === 0) {
//                 // remove userId from the userLikes array if there & subtract 1 from likes 
//                     if (sauceUpdate.usersLiked.includes(userId)) {
//                         sauceUpdate.usersLiked.pull(userId);
//                         sauceUpdate.likes--;
//                     }
//                 // remove userId from the userDislikes array if there & subtract 1 from dislikes
//                     if (sauceUpdate.usersDisliked.includes(userId)) {
//                         sauceUpdate.usersDisliked.pull(userId);
//                         sauceUpdate.dislikes--;
//                     }  
//             }
//             Sauce.updateOne({_id: req.params.id}, sauceUpdate)
//                 .then(() => {
//                     res.status(201).json({
//                         message: 'Like or Dislike Processed!'
//                     });
//                 })
//                 .catch((error) => {
//                     res.status(400).json({
//                     error: error
//                 });
//             });
//         })
//         .catch((error) => {

//             console.log(error);
            
//             res.status(400).json({
//                 error: error
//             });
//     //     };
//     });       
// };