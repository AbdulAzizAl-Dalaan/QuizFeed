var express = require('express');
const User = require('../models/User');
const Friends = require('../models/Friends');
const Message = require('../models/Message');
const { Op } = require("sequelize");
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
    // find all the users which are not the current user
    const friends_list = await Friends.findFriends(req.session.user.username)
    const pending_requests_list = await Friends.findPendingFriends(req.session.user.username)
    const my_friend_requests = await Friends.findPendingRequests(req.session.user.username)

    // res.render('friends', {friends_list, pending_requests_list, my_friend_requests});
    res.json({friends_list, pending_requests_list, my_friend_requests})
});


router.post('/acceptfriend/:username', async function(req, res, next) {
  const friend = await Friends.update({
    is_pending: false,
    is_friend: true
  }, {
    where: {
      sender: req.params.username,
      receiver: req.session.user.username,
      is_pending: true
    }
  });
  // res.redirect('/friends?msg=af')
  res.json({success: true, message: "Friend request accepted"})
});

router.post('/removefriend/:username', async function(req, res, next) {
  const friend = await Friends.destroy({
    where: {
      [Op.or]: [
        {sender: req.session.user.username, receiver: req.params.username},
        {sender: req.params.username, receiver: req.session.user.username}
      ]
    }
  });
  const messages = await Message.destroy({
    where: {
      [Op.or]: [
        {sender: req.session.user.username, receiver: req.params.username},
        {sender: req.params.username, receiver: req.session.user.username}
      ]
    }
  });
  // res.redirect('/friends?msg=rf')
  res.json({success: true, message: "Friend removed"})
});

router.post('/sendfriendrequest/:username', async function(req, res, next) {
  if (req.body.friend_request === req.session.user.username)
  {
    // res.redirect('/friends?msg=err')
    res.json({success: false, message: "You cannot send a friend request to yourself"})
  }
  else {
    const friend = await User.findByPk(req.body.friend_request)
    if (friend === null)
    {
      // res.redirect('/friends?msg=err')
      console.log("User does not exist: " + req.body.friend_request)
      res.json({success: false, message: "User does not exist"})
    }
    else
    {
      await Friends.create({
        sender: req.session.user.username,
        receiver: req.body.friend_request,
        is_pending: true,
        is_friend: false
      });
      // res.redirect('/friends?msg=sfr')
      res.json({success: true, message: "Friend request sent"})
    }
  }
});

router.get('/message/:username', async function(req, res, next) {
  const messages = await Message.findMessages(req.session.user.username, req.params.username)
  if (messages !== null)
  {
    const user = req.session.user.username
    const friend = req.params.username
    // res.render('message', {messages, user, friend});
    res.json({success: true, message: "none", messages, user, friend})
  }
  else
  {
    // res.redirect('/friends?msg=err')
    res.json({success: true, message: "No messages found", messages: [], user: "", friend: ""})
  }
});

router.post('/message/sendmessage/:username', async function(req, res, next) {
  const message = await Message.create({
    sender: req.session.user.username,
    receiver: req.params.username,
    content: req.body.message
  });
  // res.redirect('/friends/message/' + req.params.username)
  res.json({success: true, message: "Message sent", newMessage: message})
});


module.exports = router;