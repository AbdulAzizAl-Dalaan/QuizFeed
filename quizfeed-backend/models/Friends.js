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

    static async findFriendship(current_user, other_user)
    {
        // find if the current_user is a friend, pending friend, pending request, or none of the above
        try
        {
            const friendship = await Friends.findOne({ where: {
                [Op.or]: [
                    {sender: current_user, receiver: other_user, is_friend: true},
                    {sender: other_user, receiver: current_user, is_friend: true},
                    {sender: current_user, receiver: other_user, is_pending: true},
                    {sender: other_user, receiver: current_user, is_pending: true}
                ]
            }});
            if(friendship)
            {
                if(friendship.sender == current_user && friendship.is_pending)
                {
                    return "pending_request"
                }
                else if(friendship.sender == other_user && friendship.is_pending)
                {
                    return "pending_friend"
                }
                else if(friendship.sender == current_user && friendship.is_friend)
                {
                    return "friend"
                }
                else if(friendship.sender == other_user && friendship.is_friend)
                {
                    return "friend"
                }
            }
            else
            {
                return "none"
            }
        }
        catch(error)
        {
            console.log(error)
            return null
        }
    }

    static async updateFriends(old_username, new_username)
    {
        // if a user changes their username, update all the friends lists
        try
        {
            const friends = await Friends.findAll({where: {
                [Op.or]: [
                    {sender: old_username}, {receiver: old_username}
                ]
            }})
            for (let i = 0; i < friends.length; i++)
            {
                if(friends[i].sender == old_username)
                {
                    friends[i].sender = new_username
                }
                else
                {
                    friends[i].receiver = new_username
                }
                await friends[i].save()
            }
            return true
        }
        catch(error)
        {
            console.log(error)
            return false
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
