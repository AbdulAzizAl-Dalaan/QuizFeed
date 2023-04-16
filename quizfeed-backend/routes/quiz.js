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
    const filter = {
        where: {id: req.params.id},
        include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]
    }
    console.log("?????");
    Quiz.findByPk(filter)
    .then((quiz) => {quiz.updateAttributes(req.body)})
    .then(quiz => res.json(quiz))
    .catch((err)=>res.status(500).json(err));

    

    // may need to update each table manually; has many will have to create tables potentially

    // Quiz.update(
    //     req.body,
    //     {where: {id: req.params.id},
    //     include: [{ association: 'questions', include: ['choices'] }, { association: 'results' }]}
    // )
    // .then(quiz => res.json(quiz))
    // .catch((err)=>res.status(500).json(err));
});

module.exports = router;