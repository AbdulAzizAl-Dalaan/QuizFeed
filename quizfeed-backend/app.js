var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const sequelize = require('./db');
const User = require('./models/User');
const Friends = require('./models/Friends');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var friendsRouter = require('./routes/friends');
var newQuizzesRouter = require('./routes/newquizzes');
var trendingQuizzesRouter = require('./routes/trendingquizzes');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/search', searchRouter);
app.use('/friends', friendsRouter);
app.use('/newquizzes', newQuizzesRouter);
app.use('/trendingquizzes', trendingQuizzesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function setup() {
  const subu = await User.create({ firstname: 'subu', lastname: "Kandasawny", username: 'subu', password: '1234', email: 'subu@wsu.edu', number: '123-456-7890' })
  const user1 = await User.create({ firstname: 'Jon', lastname: "Doe", username: 'JDoe', password: '1234', email: 'JDoe@gmail.com', number: '123-456-7899' })
  const user2 = await User.create({ firstname: 'Sam', lastname: "Hawkins", username: 'SHawk', password: '1234', email: 'Shawk@gmail.com', number: '123-456-7898' })
  console.log("User created")
}

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced")
  setup().then(() => console.log("Setup completed"))
});

module.exports = app;