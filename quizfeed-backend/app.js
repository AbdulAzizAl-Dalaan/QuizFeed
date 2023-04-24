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
const Quiz = require('./models/Quiz');
const Question = require('./models/Question');
const Choice = require('./models/Choice');
const Result = require('./models/Result');
const Comment = require('./models/Comment');
const History = require('./models/History');
const Tag = require('./models/Tag');
const Message = require('./models/Message');

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

// through table for joining Tag and Quiz tables (many-to-many)
// docs: https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/
const QuizTags = sequelize.define('QuizTags', {}, { timestamps: false });
Quiz.belongsToMany(Tag, { through: QuizTags, as: 'tags' });
Tag.belongsToMany(Quiz, { through: QuizTags, as: 'quizzes' });

// Routers
var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home');
var searchRouter = require('./routes/search');
var friendsRouter = require('./routes/friends');
var profileRouter = require('./routes/profile');
var myAccountRouter = require('./routes/myaccount');
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
app.use('/profile', profileRouter);
app.use('/myaccount', myAccountRouter);
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
  hash1 = await bcrypt.hash('1234', saltRounds)
  hash2 = await bcrypt.hash('1234', saltRounds)
  hash3 = await bcrypt.hash('1234', saltRounds)
  hash4 = await bcrypt.hash('1234', saltRounds)
  hash5 = await bcrypt.hash('1234', saltRounds)

  const subu = await User.create({
    firstname: 'Balasubramanian', lastname: "Kandaswamy", username: 'subu', password: hash1, email: 'subu@wsu.edu', number: '123-456-7890',
    profile_pic: "https://s3.wp.wsu.edu/uploads/sites/2447/2022/12/Subu-Kandaswamy.png", bio: 'I like programming and hence, I teach Introduction to programming, Object Oriented Programming and Full Stack Development. In addition, I also teach Artificial Intelligence and Agent Based Modeling, both of which are courses related to my area of research. In my first semester (Spring 2023) at WSU, I will be offering Web Development, Software Testing and the Software Design Project I.'
  })
  const user1 = await User.create({ firstname: 'Jon', lastname: "Doe", username: 'JDoe', password: hash2, email: 'JDoe@gmail.com', number: '123-456-7899' })
  const user2 = await User.create({ firstname: 'Sam', lastname: "Hawkins", username: 'SHawk', password: hash3, email: 'Shawk@gmail.com', number: '123-456-7898' })
  const user3 = await User.create({ firstname: 'John', lastname: "Doe", username: 'Johnny', password: hash4, email: 'john@gmail.com', number: '123-456-7897' })
  const user4 = await User.create({ firstname: 'Harry', lastname: "Potter", username: 'hp', password: hash5, email: 'hp@hogwarts.edu', number: '123-456-7896' })
  const user5 = await User.create({ firstname: 'Ron', lastname: "Weasley", username: 'rw', password: hash5, email: 'rw@hogwarts.edu', number: '123-456-7895' })


  const friend1 = await Friends.create({ sender: 'subu', receiver: 'JDoe', is_friend: true, is_pending: false })
  const friend2 = await Friends.create({ sender: 'SHawk', receiver: 'subu', is_friend: true, is_pending: false })
  const friend3 = await Friends.create({ sender: 'Johnny', receiver: 'subu', is_friend: false, is_pending: true })
  const friend4 = await Friends.create({ sender: 'subu', receiver: 'hp', is_friend: false, is_pending: true })
  const frined5 = await Friends.create({ sender: 'Johnny', receiver: 'rw', is_friend: true, is_pending: false })

  const message1 = await Message.create({ sender: 'subu', receiver: 'JDoe', content: 'Hello' })
  const message2 = await Message.create({ sender: 'JDoe', receiver: 'subu', content: 'Hi' })
  const message3 = await Message.create({ sender: 'subu', receiver: 'JDoe', content: 'How are you?' })
  console.log("User created")
  const quiz1 = await Quiz.create({
    title: 'What Fruit Are You?',
    creatorUsername: 'hp',
    description: 'Ever wondered what type of fruit you are? Well today is your lucky day!',
    likes: 56,
    dislikes: 8,
    takenNum: 200,
    publishedAt: Date.now(),
    questions: [
      {
        text: 'It\'s a Friday night. You\'re probably...',
        choices: [
          { position: 0, text: 'hanging out at home', points: '0,1,0,1' },
          { position: 1, text: 'hosting friends/family', points: '0,0,2,0' },
          { position: 2, text: 'at a local restaurant', points: '1,0,0,0' },
        ]
      },
      {
        text: 'Your friend calls you in a panic. How do you respond?',
        choices: [
          { position: 0, text: 'Comfort them', points: '2,0,0,0' },
          { position: 1, text: 'Think of solutions to their problem', points: '0,0,0,1' },
          { position: 2, text: 'Distract them', points: '0,0,1,0' },
          { position: 3, text: 'Tell them I\'m on my way', points: '0,2,0,0' },
        ]
      },
      {
        text: 'Out of these options, what is your favorite condiment?',
        choices: [
          { position: 0, text: 'Ketchup', points: '0,1,0,0' },
          { position: 1, text: 'BBQ sauce', points: '1,0,1,0' },
          { position: 2, text: 'Hot sauce', points: '0,0,0,1' },
        ]
      },
      {
        text: 'Overnight you gained a super power of your choosing. Which one would you pick?',
        choices: [
          { position: 0, text: 'Teleportation', points: '0,0,1,0' },
          { position: 1, text: 'Shapeshifting', points: '0,0,0,2' },
          { position: 2, text: 'Superhuman strength', points: '0,1,0,0' },
          { position: 3, text: 'Mindreading', points: '1,0,0,0' },
        ]
      }
    ],
    results: [
      {
        position: 0,
        title: 'Strawberry',
        description: 'You\'re sweet, just like a strawberry!<br/>You are a friendly and outgoing person who brightens up everyone\'s day.'
      },
      {
        position: 1,
        title: 'Apple',
        description: 'You\'re dependable, just like an apple!<br/>You are a reliable and generous person who is always there for everyone, no matter the occassion.'
      },
      {
        position: 2,
        title: 'Banana',
        description: 'You\'re wacky, just like a banana!<br/>You are a hilarious and energetic person who loves to entertain their friends and family.'
      },
      {
        position: 3,
        title: 'Pomegranate',
        description: 'You\'re enchanting, just like a pomegranate!<br/>You are an insightful and unique person who gives the best advice, no matter the scenario.'
      },
    ],
    comments: [
      {
        creatorUsername: 'mikalooloo',
        text: 'i got my fav fruit yay'
      },
      {
        creatorUsername: 'legionas56',
        text: 'this was a great quiz!!'
      }
    ],
    tags: [
      { text: "tag 1" },
      { text: "tag 2" },
      { text: "tag 3" }
    ]
  }, {
    include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }, { association: 'comments' }]
  });
  console.log("Quiz created");
  const quiz2 = await Quiz.create({
    title: 'What Bird Are You?',
    creatorUsername: 'JDoe',
    description: 'With so many birds out there to choose from, it\'s overwhelming trying to figure out which one you are. We got you covered!',
    likes: 28,
    dislikes: 5,
    takenNum: 120,
    publishedAt: Date.now(),
    questions: [
      {
        text: 'Out of the following, which flavor of chips would you choose?',
        choices: [
          { position: 0, text: 'Salt and vinegar', points: '0,0,0,1' },
          { position: 1, text: 'Honey barbecue', points: '1,0,0,0' },
          { position: 2, text: 'Original', points: '0,1,2,0' },
        ]
      },
      {
        text: 'Favorite color?',
        choices: [
          { position: 0, text: 'Pink', points: '0,0,0,1' },
          { position: 1, text: 'Black', points: '0,2,0,0' },
          { position: 2, text: 'Red', points: '0,0,1,0' },
          { position: 3, text: 'Blue', points: '2,0,0,0' },
        ]
      },
      {
        text: 'What genre of music would you be most likely to listen to?',
        choices: [
          { position: 0, text: 'Rock', points: '0,1,0,1' },
          { position: 1, text: 'Jazz', points: '1,0,0,2' },
          { position: 2, text: 'Pop', points: '1,0,1,0' },
        ]
      }
    ],
    results: [
      {
        position: 0,
        title: 'Chickadee',
        description: 'You are friendly and curious, just like a chickadee!'
      },
      {
        position: 1,
        title: 'Hawk',
        description: 'You are patient and outspoken, just like a hawk!'
      },
      {
        position: 2,
        title: 'Robin',
        description: 'You are eye-catching and reliable, just like a robin!'
      },
      {
        position: 3,
        title: 'Hummingbird',
        description: 'You are quick-witted and protective, just like a hummingbird!'
      },
    ],
    comments: [
      {
        creatorUsername: 'braylosicles',
        text: 'i got the hummingbird 8)'
      },
      {
        creatorUsername: 'nardaguna',
        text: 'love :)'
      }
    ],
    tags: [
      { text: "tag 1" },
      { text: "tag 2" },
      { text: "tag 3" }
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
