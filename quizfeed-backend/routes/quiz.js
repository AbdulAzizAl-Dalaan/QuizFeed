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

module.exports = router;