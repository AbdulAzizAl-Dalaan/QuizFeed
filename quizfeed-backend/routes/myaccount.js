var express = require('express');
const User = require('../models/User');
const Friends = require('../models/Friends');
const Quiz = require('../models/Quiz');
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

router.get('/', async function(req, res, next) {
    // check if no username is provided in the url (i.e. /profile) then redirect to /profile/ current username
    const user = await User.findOne({ where: {username: req.session.user.username} });

    if (user)
    {
        // obtains all the friends of the user
        const friends_list = await Friends.findFriends(user.username)
        const quizzes_created = await Quiz.findAll({ where: {creatorUsername: user.username} });

        // !!!CHANGE QUERY BELOW TO PROPERLY FIND QUIZZES TAKEN BY USER!!!
        const quizzes_taken = await Quiz.findAll({ where: {creatorUsername: user.username} });

        res.json({success: true, message: "user_found", user: user, friends_list: friends_list, 
        quizzes_created: quizzes_created, quizzes_taken: quizzes_taken})
    }
    else
    {
        console.log("FAILURE")
        res.json({success: false, message: "User does not exist"}) 
    }
});

module.exports = router;
