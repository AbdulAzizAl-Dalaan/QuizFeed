var express = require('express');
const User = require('../models/User');
const Friends = require('../models/Friends');
const  Quiz = require('../models/Quiz');
const History = require('../models/History');
const { Op } = require("sequelize");
/* !!!ADD REQUIED QUIZ TAKEN FIELD HERE!!! */
var router = express.Router();

const sessionChecker = (req, res, next) => {
    if(req.session.user)
    {
      res.locals.username = req.session.user.username
      next()
    }
    else
    {
      res.redirect("/?msg=raf")
    }
  }
  
router.use(sessionChecker)

router.get('/:username', async function(req, res, next) {
    
    const user = await User.findOne({ where: {username: req.params.username} });
    let type = "none"

    if (user)
    {
        // obtains all the friends of the user
        const friends_list = await Friends.findFriends(user.username)
        const quizzes_created = await Quiz.findAll({ where: {creatorUsername: user.username} });

        // !!!CHANGE QUERY BELOW TO PROPERLY FIND QUIZZES TAKEN BY USER!!!
        const quizzes_history = await History.findAll({ where: {UserUsername: user.username} });
        const quizzes_taken = await Quiz.findAll({ where: {id: {[Op.in]: quizzes_history.map((quiz) => quiz.QuizId)}} });
        // returns either pending_request, pending_friend, friend, or user
        if (user.username !== req.session.user.username)
        {
            type = await Friends.findFriendship(req.session.user.username, req.params.username) 
        }

        // BELOW ADD QUIZZES TAKEN TO RESPONSE IF ADDED
        res.json({success: true, message: "user_found", type: type, user: user, friends_list: friends_list, 
        quizzes_created: quizzes_created, quizzes_taken: quizzes_taken})
    }
    else
    {
        console.log("FAILURE")
        res.json({success: false, message: "User does not exist"}) 
    }
});

module.exports = router;
