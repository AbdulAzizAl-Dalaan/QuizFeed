var express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const Comment = require('../models/Comment');
var router = express.Router();

// With a filter given, return all the Quizzes satisfying the filter
router.get('/', async function (req, res, next) {
    Quiz.findAll().then(output => res.json(output))
});

// With the id given, return the Quiz with Questions, Choices, and Results all included
router.get('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id, {
        include: [{
            association: 'questions',
            include: [{
                association: 'choices',
                separate: true,
                order: [['position']],
            }]
        }, {
            association: 'results',
            seperate: true,
            order: [['position']],
        }]
    })
        .then(quiz => res.json(quiz))
});

// With the quiz id and result id given, return the Quiz with Results and Comments
router.get('/:id/:result', async function (req, res, next) {
    Quiz.findByPk(req.params.id, {
        include: [{
            association: 'results',
            where: { position: req.params.result }
        }, {
            association: 'comments',
            separate: true,
            order: [['publishedAt', 'DESC']]
        }]
    })
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

// With the quiz id and result pos given, update quiz stats
router.patch('/stats/:id/:result', async function (req, res, next) {
    // Increase quiz taken number by one
    Quiz.increment({ takenNum: 1 }, {
        where: { id: req.params.id }
    });
    // Increase result received number by one
    Result.increment({ receivedNum: 1 }, {
        where: { position: req.params.result, QuizId: req.params.id }
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

// create quiz
router.post('/', async function (req, res, next) {
    Quiz.create(
        req.body,
        { include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }] }
    )
        .then(quiz => res.json(quiz))
        .catch((err) => res.status(500).json(err));
});

// update quiz
// TODO: fix this !!!
router.patch('/:id', async function (req, res, next) {
    // const filters = {where: {id: req.params.id}, include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]};

    // dumb, but couldn't find any built-in way to update associated table records
    // deletes all records, then creates everything from scratch (not efficient)
    // gives a new id
    try {
        let quiz = await Quiz.findByPk(req.params.id);
        if (!quiz) {
            res.status(422).json({ "msg": `quiz id ${req.params.id} not found` });
        } else {
            await quiz.destroy();
            delete req.body.id;
            quiz = await Quiz.create(
                req.body,
                { include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }, { association: "tags" }] }
            );
            res.json(quiz);
        }
    } catch (err) {
        res.status(500).json(err);
    }

    // const quiz = await Quiz.findByPk(req.params.id);

    // // update questions

    // // update choices per questions

    // // update results

    // // return full object
    // Quiz.findOne(filters)
    // .then(res.json(quiz))
    // .catch((err)=>res.status(500).json(err));
});

// delete quiz
router.delete('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id)
        .then(quiz => quiz.destroy())
        .then(val => res.json(val))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;