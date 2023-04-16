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

    res.render('friends', {friends_list, pending_requests_list, my_friend_requests});
});


router.get('/acceptfriend/:username', async function(req, res, next) {
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
  res.redirect('/friends?msg=af')
});

router.get('/rejectfriend/:username', async function(req, res, next) {
  const friend = await Friends.destroy({
    where: {
      sender: req.params.username,
      receiver: req.session.user.username,
      is_pending: true
    }
  });
  res.redirect('/friends?msg=rf')
});

router.get('/removefriend/:username', async function(req, res, next) {
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
  res.redirect('/friends?msg=rf')
});

router.post('/sendfriendrequest/', async function(req, res, next) {
  if (req.body.friend_request === req.session.user.username)
  {
    res.redirect('/friends?msg=err')
  }
  else {
    const friend = await User.findByPk(req.body.friend_request)
    if (friend === null)
    {
      res.redirect('/friends?msg=err')
    }
    else
    {
      await Friends.create({
        sender: req.session.user.username,
        receiver: req.body.friend_request,
        is_pending: true,
        is_friend: false
      });
      res.redirect('/friends?msg=sfr')
    }
  }
});

router.get('/message/:username', async function(req, res, next) {
  const messages = await Message.findMessages(req.session.user.username, req.params.username)
  if (messages !== null)
  {
    const user = req.session.user.username
    const friend = req.params.username
    res.render('message', {messages, user, friend});
  }
  else
  {
    res.redirect('/friends?msg=err')
  }
});

router.post('/message/sendmessage/:username', async function(req, res, next) {
  const message = await Message.create({
    sender: req.session.user.username,
    receiver: req.params.username,
    content: req.body.message
  });
  res.redirect('/friends/message/' + req.params.username)
});




module.exports = router;