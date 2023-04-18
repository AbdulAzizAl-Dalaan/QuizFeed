var express = require('express');
const History = require('../models/History');
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

// With the id, result id, and username given, add result to profile 
router.post('/:id/:result', async function (req, res, next) {
    History.create({
        QuizId: req.params.id,
        ResultId: req.params.result,
        UserUsername: req.body.username
    });
});

// With the id, result id, and username given, update whether or not the result is shown on username's profile
router.patch('/:id/:result', async function (req, res, next) {
    History.update({ visible: req.body.visible }, {
        where: {
            QuizId: req.params.id,
            ResultId: req.params.result,
            UserUsername: req.body.username
        }
    })
});

module.exports = router;