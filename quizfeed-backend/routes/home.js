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
    res.locals.courseid = req.query.courseid
  }
  console.log("CURRENT USER:" + req.session.user.username)
  res.render('home');
});

module.exports = router;
