const sequelize = require('../db');
const { Model, DataTypes, Op} = require('sequelize');
const User = require('./User');
const Friends = require('./Friends');

class Message extends Model {

    static async findMessages(username1, username2) // assuming username1 is the current user
    {
        try 
        {
            const user1 = await User.findByPk(username1)
            const user2 = await User.findByPk(username2)
            const friends = await Friends.findAll({ where: { 
                [Op.or]: [
                    {sender: username1, receiver: username2, is_friend: true}, 
                    {sender: username2, receiver: username1, is_friend: true}] } 
                })

            if(user1 && user2 && friends.length > 0)
            {
                const messages = await Message.findAll({ 
                    where: { 
                    [Op.or]: [
                        {sender: username1, receiver: username2}, 
                        {receiver: username1, sender: username2 }] } 
                    })
                return messages
            }
            else
            {
                return null
            }
        } 
        catch (error) 
        {
            console.log(error)
            return null
        }
    }



}

Message.init({

    sender:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    receiver:
    {
        type: DataTypes.STRING,
        allowNull: false
    },

    content:
    {
        type: DataTypes.TEXT,
        allowNull: false
    },

    time:
    {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    sequelize,
    modelName: 'Message',
});

module.exports = Message;