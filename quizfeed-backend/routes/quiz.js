var express = require('express');
const { Quiz, Result } = require('../models/Quiz');
var router = express.Router();

router.get('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }] })
        .then(quiz => res.json(quiz));
});

router.get('/:id/:result', async function (req, res, next) {
    Result.findByPk(req.params.result)
        .then(result => res.json(result));
});

// create quiz
router.post('/', async function (req, res, next) {
    Quiz.create(
        req.body,
        {include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]}
    )
    .then(quiz => res.json(quiz))
    .catch((err)=>res.status(500).json(err));
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
            res.status(422).json({"msg": `quiz id ${req.params.id} not found`});
        } else {
            await quiz.destroy();
            delete req.body.id;
            quiz = await Quiz.create(
                req.body,
                {include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]}
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
    .catch((err)=>res.status(500).json(err));
});

module.exports = router;