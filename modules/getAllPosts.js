const Post = require('../models/Post');

const getAllPosts = (req, res, next) => {
    req.allPosts = [];
  
    (async () => {
        const posts = await Post.findAll();
        posts.forEach(post => {
            req.allPosts.push(post.dataValues)
        })
        next();
    })()
}
module.exports = getAllPosts;