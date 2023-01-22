const express = require('express');
const app = express();
const db = require('./db');
const router = require('./routes/users.routes');

const Host = '127.0.0.1'
const Port = 3001

let allPosts = [];

app.use(express.json());
app.use("/", router)

// db.sequelize.sync({ force: true}).then(() => {
//   console.log('drop')
// })


app.listen(Port, Host, () =>
  console.log(`Server listens http://${Host}:${Port}`)
)
