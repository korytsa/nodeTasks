const uniqid = require('uniqid'); 
const User = require('../models/User.js');
const Post = require('../models/Post.js');
const express = require("express");
const router = express.Router();
const userExsists = require('../modules/userExsists.js')

router.route('/') 
    .get((req, res) => {
        (async () => {
            const allUsers = [];
            const users = await User.findAll();
            users.forEach(user => {
                allUsers.push(user.dataValues)
            });
            res.send(allUsers)
        })();
        console.log(1)
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

module.exports = router