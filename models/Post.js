const { DataTypes } = require('sequelize')
const sequelize = require('../db.js')

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  }
)
module.exports = Post