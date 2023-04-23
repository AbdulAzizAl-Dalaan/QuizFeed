var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const session = require('express-session');
const sequelize = require('./db');
const User = require('./models/User');
const Friends = require('./models/Friends');
const { Quiz } = require('./models/Quiz');
const Message = require('./models/Message');

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var friendsRouter = require('./routes/friends');
var profileRouter = require('./routes/profile');
var myAccountRouter = require('./routes/myaccount');
var newQuizzesRouter = require('./routes/newquizzes');
var trendingQuizzesRouter = require('./routes/trendingquizzes');
var quizRouter = require('./routes/quiz');


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
app.use('/profile', profileRouter);
app.use('/myaccount', myAccountRouter);
app.use('/newquizzes', newQuizzesRouter);
app.use('/trendingquizzes', trendingQuizzesRouter);
app.use('/quiz', quizRouter);

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
  hash1 = await bcrypt.hash('1234', saltRounds)
  hash2 = await bcrypt.hash('1234', saltRounds)
  hash3 = await bcrypt.hash('1234', saltRounds)
  hash4 = await bcrypt.hash('1234', saltRounds)
  hash5 = await bcrypt.hash('1234', saltRounds)

  const subu = await User.create({firstname: 'Balasubramanian',lastname:"Kandaswamy", username: 'subu', password: hash1, email: 'subu@wsu.edu', number: '123-456-7890', 
  profile_pic: "https://s3.wp.wsu.edu/uploads/sites/2447/2022/12/Subu-Kandaswamy.png", bio: 'I like programming and hence, I teach Introduction to programming, Object Oriented Programming and Full Stack Development. In addition, I also teach Artificial Intelligence and Agent Based Modeling, both of which are courses related to my area of research. In my first semester (Spring 2023) at WSU, I will be offering Web Development, Software Testing and the Software Design Project I.'})
  const user1 = await User.create({firstname: 'Jon',lastname:"Doe", username: 'JDoe', password: hash2, email: 'JDoe@gmail.com', number: '123-456-7899'})
  const user2 = await User.create({firstname: 'Sam',lastname:"Hawkins", username: 'SHawk', password: hash3, email: 'Shawk@gmail.com' , number: '123-456-7898'})
  const user3 = await User.create({firstname: 'John',lastname:"Doe", username: 'Johnny', password: hash4, email: 'john@gmail.com', number: '123-456-7897'})
  const user4 = await User.create({firstname: 'Harry',lastname:"Potter", username: 'hp', password: hash5, email: 'hp@hogwarts.edu', number: '123-456-7896'})
  const user5 = await User.create({firstname: 'Ron',lastname:"Weasley", username: 'rw', password: hash5, email: 'rw@hogwarts.edu', number: '123-456-7895'})


  const friend1 = await Friends.create({sender: 'subu', receiver: 'JDoe', is_friend: true, is_pending: false})
  const friend2 = await Friends.create({sender: 'SHawk', receiver: 'subu', is_friend: true, is_pending: false})
  const friend3 = await Friends.create({sender: 'Johnny', receiver: 'subu', is_friend: false, is_pending: true})
  const friend4 = await Friends.create({sender: 'subu', receiver: 'hp', is_friend: false, is_pending: true})
  const frined5 = await Friends.create({sender: 'Johnny', receiver: 'rw', is_friend: true, is_pending: false})

  const message1 = await Message.create({sender: 'subu', receiver: 'JDoe', content: 'Hello'})
  const message2 = await Message.create({sender: 'JDoe', receiver: 'subu', content: 'Hi'})
  const message3 = await Message.create({sender: 'subu', receiver: 'JDoe', content: 'How are you?'})
  console.log("User created")
  const quiz1 = await Quiz.create({
    id: 0,
    title: 'Quiz Title',
    creatorUsername: 'user who created quiz',
    description: 'quiz description',
    takenNum: 0,
    approval: 56,
    questions: [
      {
        text: 'question question?',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'choice 1', variant: 'b-mediumBlue', points: '0,3' },
          { text: 'choice 2', variant: 'b-mediumBlue', points: '3,0' },
          { text: 'choice 3', variant: 'b-mediumBlue', points: '0,8' },
        ]
      },
      {
        text: 'question?',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'choice 4', variant: 'b-mediumBlue', points: '0,4' },
          { text: 'choice 5', variant: 'b-mediumBlue', points: '4,0' },
          { text: 'choice 6', variant: 'b-mediumBlue', points: '0,8' }
        ]
      }
    ],
    results: [
      {
        title: 'Result 1',
        description: 'Description 1'
      },
      {
        title: 'Result 2',
        description: 'Description 2'
      }
    ]
  }, {
    include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]
  });
  console.log("Quiz created");
}

sequelize.sync({ force: true }).then(() => {
  console.log("Database synced")
  setup().then(() => console.log("Setup completed"))
});

module.exports = app;
