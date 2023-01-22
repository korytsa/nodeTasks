const db = require('../db');
const User = db.users;
const Post = db.posts;
const uniqid = require('uniqid'); 

class usersController {
    async createUsers (req, res) {
        await User.sync({force: true});
        await User.bulkCreate([{
        id: uniqid(),
        username: 'John',
        password: 'Hancock'
        },{
        id: uniqid(),
        username: 'Ann',
        password: '111'
        },{
        id: uniqid(),
        username: 'Kate',
        password: 'qwerty'
        }])
        res.send('Users was added')
    };
    async createPost(req, res) {
        await Post.sync({force: true});
        await Post.create({
            id: uniqid(),
            title: req.body.title,
            author: req.query.username
        })
        res.send('Post created')
    };
    async findAllUsers (req, res) {
        const allUsers = [];
        const users = await User.findAll();
        users.forEach(user => {
            allUsers.push(user.dataValues)
        });
        res.send(allUsers)
    };
    async findAllPosts (req, res) {
        res.send(req.allPosts)
    };
    async updatePosts (req, res) {
        await Post.create({
            id: uniqid(),
            title: req.body.title,
            author: req.query.username
        });
        res.send('Post added')
    };
    async deleteAllPosts(req, res) {
        await Post.destroy({
            where: { author: req.query.username },
        })
        res.send(`All posts by ${req.query.username} have been deleted`)
    };
}

module.exports = new usersController();