const sequelize = require('../db');
const { Model, DataTypes, Op} = require('sequelize');
const User = require('./User');

class Friends extends Model 
{
    static async findFriends(username)
    {
        try 
        {
            const user = await User.findByPk(username)
            if(user)
            {
                const friends = await Friends.findAll({
                    where: {
                        [Op.or]: [
                            {sender: username, is_friend: true},
                            {receiver: username, is_friend: true}
                        ]
                    }
                })
                let names_list = []
                for (let i = 0; i < friends.length; i++)
                {
                    if(friends[i].sender == username)
                    {
                        names_list.push(friends[i].receiver)
                    }
                    else
                    {
                        names_list.push(friends[i].sender)
                    }
                }

                const final_friends_list = await User.findAll({where: 
                   { username: { [Op.in]: names_list} }})

                return final_friends_list
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

    static async findPendingFriends(username)
    {
        try 
        {
            const user = await User.findByPk(username)
            if(user)
            {
                const friends_requests = await Friends.findAll({
                    where: {
                        [Op.and]: [
                            {receiver: username}, {is_pending: true}
                        ]
                    }
                })

                const pending_list = await User.findAll({where: 
                    { username: { [Op.in]: friends_requests.map(friend => friend.sender) } }})
                
                return pending_list
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

    static async findPendingRequests(username)
    {
        try 
        {
            const user = await User.findByPk(username)
            if(user)
            {
                const friends_requests = await Friends.findAll({
                    where: {
                        [Op.and]: [
                            {sender: username}, {is_pending: true}
                        ]
                    }
                })

                const pending_list = await User.findAll({where: 
                    { username: { [Op.in]: friends_requests.map(friend => friend.receiver) } }})
                
                return pending_list
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

Friends.init({

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

    is_friend:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },

    is_pending:
    {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Friends',
});

module.exports = Friends;
