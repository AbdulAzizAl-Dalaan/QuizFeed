var express = require('express');
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
  if (req.query.msg)
  {
    res.locals.msg = req.query.msg
  }
  console.log("CURRENT USER:" + req.session.user.username)
  // res.render('home');
  if (res.locals.username)
  {
    res.json({msg: res.locals.msg, username: res.locals.username})
  } 
  else
  {
    res.json({msg: res.locals.msg, username: "none"})
  }
});

module.exports = router;
