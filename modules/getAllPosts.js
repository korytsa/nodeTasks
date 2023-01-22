const db = require('../db');

const Post = db.posts;

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