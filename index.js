const express = require('express');
const app = express();
let fs = require('fs');

const Host = '127.0.0.1'
const Port = 3001

const path = './info.json';
let dataUsers = JSON.parse(fs.readFileSync('users.json', 'utf8'));


app.use(express.json());

const fileExsists = (req, res, next) => {
  let filePath = fs.existsSync(path);
  if(req.method === "POST"){
    return filePath ? res.send('A file with the same name exists') : next()
  } 
  return filePath ? next() : res.status(500).json({error: 'File not found'})
}

const userExsists = (req, res, next) => {
  let userFind = false;
  dataUsers.users.forEach( user => {
    if(user.username === req.query.username && user.password === req.query.password ){
      userFind = true
    }
  });
    return userFind ? next() : res.status(500).json({ message: "User not found" })
}

app.post('/users', [userExsists, fileExsists], (req, res) => {
  dataUsers.users.push(req.body)
  res.send(fs.writeFileSync('users.json', JSON.stringify(dataUsers)))
})

app.post('/', [fileExsists], (req, res) => {
    if (!fs.existsSync(path)) {
        fs.open('info.json', 'w', () => {
            fs.writeFileSync('info.json', JSON.stringify(req.body));
            res.send('File created')
        });
    } 
})

app.get('/', [userExsists, fileExsists], (req, res) => {
    let data = JSON.parse(fs.readFileSync('info.json', 'utf8'));

    Object.keys(data).length === 0 ? 
        res.status(500).json({error: 'File is empty'})
        : res.status(200).send(data)
})

app.put('/', [userExsists, fileExsists], (req, res) => {
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

app.delete('/', [userExsists, fileExsists], (req, res) => {
    fs.unlink('info.json', (err) => {
        if (err) throw err;
        res.send('Deleted');
    });
})

app.listen(Port, Host, () =>
  console.log(`Server listens http://${Host}:${Port}`)
)