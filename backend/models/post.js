// in /models/post.js

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }
  //TODO add title field
  Post.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    message: DataTypes.TEXT,
    mediaUrl: DataTypes.STRING,
    usersRead: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};