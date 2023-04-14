var express = require('express');
const { Quiz, Result } = require('../models/Quiz');
var router = express.Router();

// With the id given, return the Quiz with Questions, Choices, and Results all included
router.get('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }] })
        .then(quiz => res.json(quiz))
});

// With the id and result id given, return the Quiz with Results
router.get('/:id/:result', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'results' }] })
        .then(result => res.json(result))
});

// With the id and result id given, update quiz stats
router.patch('/:id/:result', async function (req, res, next) {
    // Increase quiz taken number by one
    Quiz.increment({ takenNum: 1 }, {
        where: { id: req.params.id }
    })
        .catch(() => {
            console.log("ERROR: Could not find Quiz to increment");
            res.json({ error: 'Quiz not found' });
        });
    // Increase result received number by one
    Result.increment({ receivedNum: 1 }, {
        where: { id: req.params.result, QuizId: req.params.id }
    });
});

module.exports = router;