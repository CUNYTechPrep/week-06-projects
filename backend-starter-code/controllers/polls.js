const express = require('express');
const models = require('../models');

const PollsController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.index);
        router.get('/questions', this.questions);
        router.get('/questions/:id', this.questionNum);

        return router;
    },

    index(req, res) {
        res.json({
            msg: "This is the polls app",
        });
    },

    questions(req, res) {
        res.json({
            msg: "Successful get to /polls/questions",
        });
    },

    questionNum(req, res) {
        res.json({
            msg: "Looking at question " + req.params.id,
            id: req.params.id,
        });
    },
}

module.exports = PollsController.registerRouter();