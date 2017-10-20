const express = require('express');
const models = require('../models');

const router = express.Router();


// This route retrieves a list of all poll questions
router.get('/', (req, res) => {
  models.Polls.findAll()
    .then((allPolls) => {
      res.json(allPolls);
    })
});

// This route is for creating a new poll object
//  We provide the `question` in the body parameters
//  Note: this does NOT take an array of choices
router.post('/', (req, res) => {
  models.Polls.create({
    question: req.body.question
  })
  .then((poll) => {
    res.json(poll);
  })
  .catch(() => {
    res.sendStatus(400);
  })
});

router.put('/:id', (req, res) => {
	let pollId = parseInt(req.params.id);
	let questionText = req.body.question;
	// apparently, when you put data in application/json, it is part of the
	// response body. Upon looking at the post requests, this behavior is
	// similar.
	//console.log(req);
	//console.log(req.params);
	//console.log(req.body);
	models.Polls.findById(parseInt(req.params.id))
	.then(poll => {
		poll.update({question : questionText});
	})
	.catch(error => {
		res.json({
				description:`Could not find record with id ${pollId}`,
				error
		})
		.sendStatus(404);
	})
	.then(updatedPoll => {
		res.json(updatedPoll);
	});
})

// This route is used to retrieve a specific poll object
//  The query also retrieves all associated choices for the poll
router.get('/:id', (req, res) => {
  models.Polls.findById(parseInt(req.params.id), {
    include: [{
      model: models.Choices
    }]
  })
  .then(poll => {
    res.json(poll);
  });
});

// This route is used for adding a choice for a specific poll
//  The poll id is in the route parameters
//  The choice description is in the parameters
router.post('/:id/choices', (req, res) => {
  models.Polls.findById(parseInt(req.params.id))
    .then(poll => {
      models.Choices.create({
        description: req.body.description,
        PollId: poll.id
      })
      .then((choice) => {
        res.json(choice);
      })
    })
    .catch(() => {
      console.log('error here')
      res.sendStatus(400);
    });
});

// Delete a post, and all associated choices.
router.delete('/:id', (req, res) => {
	//* With a bulk destroy.
	let pollId = parseInt(req.params.id);
	models.Choices.destroy({
		where: {
			PollId: pollId
		}
	})
	.then(() => {
		return models.Polls.findById(pollId);
	})
	.then(poll => poll.destroy())
	.then(() => {
		res.json('Poll deleted!');
	})
	//*/
	/* With multiple requests
		models.Polls.findById(parseInt(req.params.id), {
			include: [{model: models.Choices}]
		})
		.then(poll => {
			return Promise.all(poll.Choices.map(choice => choice.destroy()));
		})
		.then(() => models.Polls.findById(parseInt(req.params.id)))
		.then(poll => poll.destroy())
		.then(() => {
			res.json('Poll deleted!');
		});
	//*/
	/*
	models.Polls.findById(parseInt(req.params.id))
	.then(poll => {
		return poll.destroy()
	}).then(() => {
		res.json('Poll deleted!');
	})
	*/
})


module.exports = router;
