var express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const Comment = require('../models/Comment');
var router = express.Router();

// **** GET ****

// With the quiz id given, return the Quiz with Questions, Choices, and Results all included
router.get('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }] })
        .then(quiz => res.json(quiz))
});

// With the quiz id and result id given, return the Quiz with Results and Comments
router.get('/:id/:result', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'results' }, { association: 'comments' }] })
        .then(result => res.json(result))
});


// **** POST ****

router.post('/comment/:id', async function (req, res, next) {
    const newComment = await Comment.create({
        creatorUsername: req.body.username,
        text: req.body.text,
        QuizId: req.params.id
    });
});


// **** PATCH ****

// With the quiz id and result id given, update quiz stats
router.patch('/stats/:id/:result', async function (req, res, next) {
    // Increase quiz taken number by one
    Quiz.increment({ takenNum: 1 }, {
        where: { id: req.params.id }
    });
    // Increase result received number by one
    Result.increment({ receivedNum: 1 }, {
        where: { id: req.params.result, QuizId: req.params.id }
    });
});

// With the quiz id and feedback given, update feedback for quiz
router.patch('/feedback/:id', async function (req, res, next) {
    console.log(req.params);
    // If liked
    if (req.body.approval) {
        Quiz.increment({ likes: 1 }, {
            where: { id: req.params.id }
        });
    }
    else {
        Quiz.increment({ dislikes: 1 }, {
            where: { id: req.params.id }
        });
    }
});


// **** DELETE ****

// With the quiz id and comment id given, delete comment
router.delete('/comment/:id/:commentid', async function (req, res, next) {
    Comment.findByPk(req.params.commentid)
        .then(comment => {
            if (comment) comment.destroy();
        });
});

module.exports = router;