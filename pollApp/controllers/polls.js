const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
   models.Polls.findAll()
      .then((allPolls) => {
         res.json(allPolls);
      })
});

router.post('/:id/choices', (req, res) => {
   models.Polls.findById(parseInt(req.params.id))
      .then(poll => {
         models.Choices.create({
            body: req.body.body,
            PollId: poll_id
         })
      })
});

router.put('/:id/choices', (req, res) => {
   models.Polls.findById(parseInt(req.params.id))
      .then(poll => {
         models.Choices.update({
            body: req.body.body,
            PollId: poll_id
         })
      })

   })
})

router.delete('/:id/choices', (req, res) => {
   models.Polls.findById(parseInt(req.params.id))
      .then(poll => {
         models.Choices.create({
            body: req.body.body,
            PollId: poll_id
         })
      }).then(() => {
         models.Polls.destroy({
            where: {
               PollId: poll_id,
            }
         }).then(() => {
            res.sendStatus(400);
         })
      });
   }).catch(() => {
      console.log('ERROR')
   })
});

module.exports = router;
