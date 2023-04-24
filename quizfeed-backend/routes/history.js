var express = require('express');
const History = require('../models/History');
const Result = require('../models/Result');
var router = express.Router();

// With the username given, find all quizzes user has taken
router.get('/:username', async function (req, res, next) {
    History.findAll({
        where: {
            UserUsername: req.params.username
        }
    }).then(history => history ? res.json(history) : res.json('{}'));
});

// With the id and username given, find if user has taken this quiz before and if so what result
router.get('/:id/:username', async function (req, res, next) {
    History.findAll({
        where: {
            QuizId: req.params.id,
            UserUsername: req.params.username
        }
    }).then(history => history ? res.json(history) : res.json('{}'));
});

// With the id, result pos, and username given, add result to profile 
router.post('/:id/:result', async function (req, res, next) {
    const result = await Result.findOne({ where: { QuizId: req.params.id, position: req.params.result } });
    History.create({
        QuizId: req.params.id,
        ResultId: result.id,
        UserUsername: req.body.username
    });
});

// With the id, result pos, and username given, update whether or not the result is shown on username's profile
router.patch('/:id/:result', async function (req, res, next) {
    const result = await Result.findOne({ where: { QuizId: req.params.id, position: req.params.result } });
    History.update({ visible: req.body.visible }, {
        where: {
            QuizId: req.params.id,
            ResultId: result.id,
            UserUsername: req.body.username
        }
    })
});

module.exports = router;