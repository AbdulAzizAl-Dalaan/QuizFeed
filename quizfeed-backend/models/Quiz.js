const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Quiz extends Model {
}

Quiz.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    creatorUsername: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    takenNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    dislikes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NULL
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NULL
    }
}, {
    sequelize,
    modelName: 'Quiz'
});

module.exports = Quiz;