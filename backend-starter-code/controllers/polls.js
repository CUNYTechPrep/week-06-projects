router.put('/:id', (req, res, next) => {
   models.Polls.update({
     question: req.body.question,
   },
   { 
     where: {
       id: req.params.id,
     },returning: true,
   })
   .catch(next)
 });
router.delete('/:id', (req, res) => {
       models.Choices.destroy({
         where: {
           PollId: req.params.id,
         },
       }).then(() => {
         models.Polls.destroy({
           where: {
             id: req.params.id,
           }
         })
       }).then(() => {
         res.redirect('/polls');
       })
 });
module.exports = router;