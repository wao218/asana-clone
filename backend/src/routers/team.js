const express = require('express');
const Team = require('../models/team');
const auth = require('../middleware/auth');
const router = new express.Router();

// Creating a new team
router.post('/teams', auth, async (req, res) => {
  await req.user.populate('workspaces').execPopulate();


  // Need to associate the team to the correct workspace if user has more than one workspace
  const team = new Team({
    ...req.body,
    workspace_id: req.user.workspaces[0]._id,
    owner_id: req.user._id
  });


  try {
    await team.save();
    res.status(201).send(team);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Reading all teams

// Reading a single team

// Updating a team

// Deleting a team

module.exports = router;