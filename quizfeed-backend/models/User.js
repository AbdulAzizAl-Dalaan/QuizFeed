const sequelize = require('../db');
const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static async findUser(username, password) {
        try {
            const user = await User.findByPk(username)
            if (user && user.password === password) {
                return user
            }
            else {
                return null
            }
        }
        catch (error) {
            console.log(error)
            return null
        }
    }
}

User.init({
    firstname:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    username:
    {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            not: 'myAccount'
        }
    },
    password:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    email:
    {
        type: DataTypes.STRING,
        allowNull: false
    },
    bio:
    {
        type: DataTypes.STRING,
        defaultValue: "I am glad to be a part of QuizFeed!"
    }, 
    profile_pic:
    {
        type: DataTypes.STRING,
        defaultValue: "https://i.imgur.com/V4RclNb.png"
    },
    number:
    {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'User'
});


module.exports = User