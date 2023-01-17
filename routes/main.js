const uniqid = require('uniqid'); 
const Post = require('../models/Post.js');
const userExsists = require('../modules/userExsists.js');
const getAllPosts = require('../modules/getAllPosts.js');
const express = require("express");
const router = express.Router();

router.route('/')
    .get([getAllPosts], (req, res) => {
        res.send(req.allPosts)
    })

    .post([userExsists], (req, res) => {
        (async () => {
            await Post.sync({force: true});
            await Post.create({
                id: uniqid(),
                title: req.body.title,
                author: req.query.username
            })
            res.send('Post created')
        })();
    })
    
    .put([userExsists, getAllPosts], (req, res) => {
        (async () => {
            await Post.create({
                id: uniqid(),
                title: req.body.title,
                author: req.query.username
            });
            res.send('Post added')
        })();
    })
  
    .delete([userExsists], (req, res) => {
        (async () => {
            await Post.destroy({
                where: { author: req.query.username },
            })
            res.send(`All posts by ${req.query.username} have been deleted`)
        })();
    })

module.exports = router;