const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Comment extends Model {
}

Comment.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    creatorUsername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NULL
    }
}, {
    sequelize,
    modelName: 'Comment'
});

module.exports = Comment;