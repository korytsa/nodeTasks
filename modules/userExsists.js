const db = require('../db');

const User = db.users;


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
module.exports = userExsists;