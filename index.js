const express = require('express');
const app = express();
let fs = require('fs');

const Host = '127.0.0.1'
const Port = 3000

const path = './info.json';
let dataUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'));

let userFind = false;

app.use(express.json());

app.use('/', function (req, res, next) {
  if(!fs.existsSync(path)){
    res.status(500).json({error: 'File not found'})
  } 
  next();
})

app.use('/users', function (req, res, next) {
  userFind = false
  dataUsers.users.forEach( user => {
    if(user.username === req.query.username && user.password === req.query.password ){
      userFind = true
    }
  });
    userFind ? console.log('User found and password correct') : console.log('User not found')
    next();
}) 

app.post('/users', (req, res) => {
  if (!userFind){
    dataUsers.users.push(req.query)
    res.send(fs.writeFileSync('users.json', JSON.stringify(dataUsers)))
  }
})

app.post('/', (req, res) => {
    if (!fs.existsSync(path)) {
        fs.open('info.json', 'w', () => {
            fs.writeFileSync('info.json', JSON.stringify(req.body));
            res.send('File created')
        });
    } else{
        res.send('A file with the same name exists')
    }
})

app.get('/', (req, res) => {
    let data = JSON.parse(fs.readFileSync('info.json', 'utf8'));

    Object.keys(data).length === 0 ? 
        res.status(500).json({error: 'File is empty'})
        : res.status(200).send(data)
})

app.put('/', (req, res) => {
    let data = JSON.parse(fs.readFileSync('info.json', 'utf8'));

    for (key in req.body){
        Object.keys(data).forEach((item) => {
            if (item === key){
                item = req.body[key]
            }else {
                data[key] = req.body[key]
            }
        })
    }
    fs.writeFileSync('info.json', JSON.stringify(data));
    res.send(data)
})

app.delete('/', (req, res) => {
    fs.unlink('info.json', (err) => {
        if (err) throw err;
        res.send('Deleted');
    });
})

app.listen(Port, Host, () =>
  console.log(`Server listens http://${Host}:${Port}`)
)