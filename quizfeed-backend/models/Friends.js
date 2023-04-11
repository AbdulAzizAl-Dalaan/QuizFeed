const { response } = require('../app');
const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class Friends extends Model {
    }

Friends.init({

    sender:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    rechiever:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    isfriend:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    response:
    {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Friends',
});

module.exports = Friends;
