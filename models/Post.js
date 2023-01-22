module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define('Post', {
    id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
  })
  return Post;
}