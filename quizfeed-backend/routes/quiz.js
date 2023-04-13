var express = require('express');
const { Quiz } = require('../models/Quiz');
var router = express.Router();

router.get('/:id', async function (req, res, next) {
    Quiz.findByPk(req.params.id, { include: [{ association: 'questions', include: ['choices'] }] })
        .then(quiz => res.json(quiz));
});

module.exports = router;