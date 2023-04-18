var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const sequelize = require('./db');
const User = require('./models/User');
const Friends = require('./models/Friends');
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const Choice = require('./models/Choice');
const Result = require('./models/Result');
const Comment = require('./models/Comment');
const History = require('./models/History');

// Model Associations
Quiz.hasMany(Question, { as: 'questions' });
Question.belongsTo(Quiz);
Question.hasMany(Choice, { as: 'choices' });
Choice.belongsTo(Question);

Quiz.hasMany(Result, { as: 'results' });
Result.belongsTo(Quiz);

Quiz.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Quiz);

User.hasMany(History, { as: 'histories' });
History.belongsTo(User);
Quiz.hasMany(History, { as: 'histories' });
History.belongsTo(Quiz);
Result.hasMany(History, { as: 'histories' });
History.belongsTo(Result);

// Routers
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var friendsRouter = require('./routes/friends');
var newQuizzesRouter = require('./routes/newquizzes');
var trendingQuizzesRouter = require('./routes/trendingquizzes');
var quizRouter = require('./routes/quiz');
var historyRouter = require('./routes/history');

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
app.use('/quiz', quizRouter);
app.use('/history', historyRouter);

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
  const quiz1 = await Quiz.create({
    id: 0,
    title: 'What Fruit Are You?',
    creatorUsername: 'mikalooloo',
    description: 'Ever wondered what type of fruit you are? Well today is your lucky day!',
    questions: [
      {
        text: 'It\'s a Friday night. You\'re probably...',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'hanging out at home', variant: 'b-mediumBlue', points: '0,1,0,1' },
          { text: 'hosting friends/family', variant: 'b-mediumBlue', points: '0,0,2,0' },
          { text: 'at a local restaurant', variant: 'b-mediumBlue', points: '1,0,0,0' },
        ]
      },
      {
        text: 'Your friend calls you in a panic. How do you respond?',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'Comfort them', variant: 'b-mediumBlue', points: '2,0,0,0' },
          { text: 'Think of solutions to their problem', variant: 'b-mediumBlue', points: '0,0,0,1' },
          { text: 'Distract them', variant: 'b-mediumBlue', points: '0,0,1,0' },
          { text: 'Tell them I\'m on my way', variant: 'b-mediumBlue', points: '0,2,0,0' },
        ]
      },
      {
        text: 'Out of these options, what is your favorite condiment?',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'Ketchup', variant: 'b-mediumBlue', points: '0,1,0,0' },
          { text: 'BBQ sauce', variant: 'b-mediumBlue', points: '1,0,1,0' },
          { text: 'Hot sauce', variant: 'b-mediumBlue', points: '0,0,0,1' },
        ]
      },
      {
        text: 'Overnight you gained a super power of your choosing. Which one would you pick?',
        variant: 'q-mediumBlue',
        choices: [
          { text: 'Teleportation', variant: 'b-mediumBlue', points: '0,0,1,0' },
          { text: 'Shapeshifting', variant: 'b-mediumBlue', points: '0,0,0,2' },
          { text: 'Superhuman strength', variant: 'b-mediumBlue', points: '0,1,0,0' },
          { text: 'Mindreading', variant: 'b-mediumBlue', points: '1,0,0,0' },
        ]
      }
    ],
    results: [
      {
        title: 'Strawberry',
        description: 'You\'re sweet, just like a strawberry!<br/>You are a friendly and outgoing person who brightens up everyone\'s day.'
      },
      {
        title: 'Apple',
        description: 'You\'re dependable, just like an apple!<br/>You are a reliable and generous person who is always there for everyone, no matter the occassion.'
      },
      {
        title: 'Banana',
        description: 'You\'re wacky, just like a banana!<br/>You are a hilarious and energetic person who loves to entertain their friends and family.'
      },
      {
        title: 'Pomegranate',
        description: 'You\'re enchanting, just like a pomegranate!<br/>You are an insightful and unique person who gives the best advice, no matter the scenario.'
      },
    ],
    comments: [
      {
        creatorUsername: 'mikalooloo',
        text: 'i got my fav character yay'
      },
      {
        creatorUsername: 'legionas56',
        text: 'this was a great quiz!!'
      }
    ]
  }, {
    include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }, { association: 'comments' }]
  });
  console.log("Quiz created");
}

// If no argument is given, drop db and do fresh setup
if (process.argv.length === 2) {
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Connected to database');
      setup()
        .then(() => console.log("Setup completed"));
    });
}
else {
  for (let i = 2; i < process.argv.length; i++) {
    console.log(process.argv[i]);
    switch (process.argv[i]) {
      case "keep":
        sequelize.sync({ force: false })
          .then(() => console.log('Connected to database'))
          .catch(err => console.log('Unable to connect to database:', err));
        break;
    }
  }
}





module.exports = app;
