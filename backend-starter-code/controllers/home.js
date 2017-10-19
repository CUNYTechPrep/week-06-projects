const express = require('express');
const models = require('../models');

// One way to define a controller vs alt
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Welcome");
});

module.exports = router;
