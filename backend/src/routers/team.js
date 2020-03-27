const express = require('express');
const Team = require('../models/team');
const Workspace = require('../models/workspace');
const auth = require('../middleware/auth');
const router = new express.Router();

// Creating a new team
router.post('/teams/:id', auth, async (req, res) => {
  // await req.user.populate('workspaces').execPopulate();
  const workspace = await Workspace.findById(req.params.id);
  if (!workspace) {
    throw new Error();
  }

  const team = new Team({
    ...req.body,
    workspace_id: workspace._id,
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
router.get('/teams/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const team = await Team.findOne({ _id });
    if (!team) {
      return res.status(404).send();
    }

    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

// Updating a team
router.patch('/teams/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'team_members'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid update!'
    });
  }

  try {
    const team = await Team.findOne({ _id: req.params.id });

    if (!team) {
      return res.status(400).send();
    }

    updates.forEach((update) => team[update] = req.body[update]);
    await team.save();
    res.send(team);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Deleting a team
// Need to add pre script to delete all projects
router.delete('/teams/:id', auth, async (req, res) => {
  try {
    const team = await Team.findOneAndDelete({ _id: req.params.id });
    if (!team) {
      return res.status(404).send();
    }
    // await req.team.remove();
    res.send(team);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;