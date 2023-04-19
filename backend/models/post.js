// in /models/post.js

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
    }
  }  
  Post.init({
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    mediaUrl: DataTypes.STRING,
    usersRead: DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};