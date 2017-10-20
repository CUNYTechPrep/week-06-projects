const express = require('express');
const models = require('../models');

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    msg: "Successful GET to '/' route"
  });
});

router.delete('/', (req, res) => {
	res.json({
		msg: "Successful DELETE to '/' route"
	});
});

module.exports = router;
