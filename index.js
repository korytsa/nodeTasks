const express = require('express');
const app = express();
let fs = require('fs');
const uniqid = require('uniqid'); 
const User = require('./models/User');
const Post = require('./models/Post');

const Host = '127.0.0.1'
const Port = 3001

let allPosts = [];

app.use(express.json());

//create users
(async () => {
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
})();

const userExsists = (req, res, next) => {
  (async () => {
    let userFind = false;

    const users = await User.findAll();
    users.forEach(user => {
      if(user.dataValues.username === req.query.username && user.dataValues.password === req.query.password ){
        userFind = true
      }
    });
    
    return userFind ? next() : res.status(500).json({ message: "User not found" })
  })()
}

const getAllPosts = (req, res, next) => {
  allPosts = [];

  (async () => {
    const posts = await Post.findAll();
    posts.forEach(post => {
      allPosts.push(post.dataValues)
    })
  next();
  })()
}

app.get('/users', (req, res) => {
  (async () => {
    const allUsers = [];
    const users = await User.findAll();
    users.forEach(user => {
      allUsers.push(user.dataValues)
    });
    res.send(allUsers)
  })();
})

app.post('/users', [userExsists], (req, res) => {
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

app.get('/',[getAllPosts], (req, res) => {
  res.send(allPosts)
})

app.put('/', [userExsists, getAllPosts], (req, res) => {
  (async () => {
    await Post.create({
      id: uniqid(),
      title: req.body.title,
      author: req.query.username
    });
    res.send('Post added')
  })();
})

app.delete('/', [userExsists], (req, res) => {
  (async () => {
    await Post.destroy({
      where: { author: req.query.username },
    })
    res.send(`All posts by ${req.query.username} have been deleted`)
  })();
})

app.listen(Port, Host, () =>
  console.log(`Server listens http://${Host}:${Port}`)
)