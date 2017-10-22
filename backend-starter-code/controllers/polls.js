const express = require('express');
const models = require('../models');

const PollsController = {
    registerRouter() {
        const router = express.Router();

        router.get('/', this.getAllPolls);
        router.post('/', this.createNewPoll);
        router.get('/:id', this.pollNumber);
        router.post('/:id/choices', this.choices);
        router.delete('/:id', this.deletePoll);

        return router;
    },

    //This route retrieves a list of all poll questions
    getAllPolls(req, res) {
        models.Polls.findAll()
            .then( (allPolls) => {
                res.render('polls', {allPolls});
            })
    },

    //This route is for creating a new poll object
    //We provide the 'question' in the body parameters
    //Note: this does NOT take an array of choices
    createNewPoll(req, res) {
        models.Polls.create({
            question: req.body.question,
        })
        .then( (poll) => {
            choices = [];
            choices.push(req.body.choice1);
            choices.push(req.body.choice2);
            choices.push(req.body.choice3);
            choices.push(req.body.choice4);

            for (let choice in choices) {
                models.Choices.create({
                    PollId: poll.id,
                    description: choices[choice],
                })
            }
            //res.redirect('/polls')
        })
        .then( (choices) => {
            res.redirect('/polls');
        })
        .catch( () => {
            res.sendStatus(400);
        })
    },
    
    //This route is used to retrieve a specific poll object
    //The query also retrieves all associated choices for the poll
    pollNumber(req, res) {
        models.Polls.findById(parseInt(req.params.id), {
            include: [{
                model: models.Choices,
            }]
        })
        .then( poll => {
            //res.json(poll);
            res.render('pollQuestion', {poll})
        });
    },

    choices(req, res) {
        models.Polls.findById(parseInt(req.params.id))
            .then( poll => {
                models.Choices.create({
                    description: req.body.description,
                    PollId: poll.id,
                })
                .then( (choice) => {
                    res.json(choice);
                })
            })
            .catch( () => {
                console.log('error here');
                res.sendStatus(400);
            });
    },

    deletePoll(req, res) {
        models.Polls.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then( () => {
            res.redirect('/polls');
        })
    },
}

module.exports = PollsController.registerRouter();