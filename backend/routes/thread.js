const express = require('express');
const router = express.Router();
const ValidThreadInputs = require('../validation/thread');

const Thread = require('../models/Thread');

router.post('/createThreads', function(req, res) {
  const { errors, isValid } = ValidThreadInputs(req.body);
  if(!isValid) {
      return res.status(400).json(errors);
  }
  const newThread = new Thread({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      username: req.body.username,
      userId: req.body.userId
  });
  newThread
      .save()
      .then(user => {
          res.json(thread)
      });
  res.json(newThread)
})

router.get('/getAllThread', (req,res) => {
  var userId = JSON.parse(req.query.data).userId
  Thread.find({
    userId: userId
  }).then(r => {
    res.json(r)
  });
});

module.exports = router;
