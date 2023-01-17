const express = require('express');
const app = express();
const uniqid = require('uniqid'); 
const User = require('./models/User');
const usersRouter = require('./routes/users');
const mainRouter = require('./routes/main');

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

app.use('/users', usersRouter);
app.use('/', (req, res, next) => {
  req.allPosts = allPosts;
  next()
});
app.use('/', mainRouter);

app.listen(Port, Host, () =>
  console.log(`Server listens http://${Host}:${Port}`)
)