const express = require('express');
const Workspace = require('../models/workspace');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create an Workspace
router.post('/workspaces', auth, async (req, res) => {
  const workspace = new Workspace({
    ...req.body,
  });

  try {
    await workspace.save();
    res.status(201).send(workspace);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Read all Workspaces
router.get('/workspaces', auth, async (req, res) => {
  try {
    const workspaces = await Workspace.find();

    res.send(workspaces)
  } catch (e) {
    res.status(500).send();
  }
});

// Read an individual Workspace
router.get('/workspaces/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const workspace = await Workspace.findOne({ _id });
    if (!workspace) {
      return res.status(404).send();
    }

    res.send(workspace);
  } catch (e) {
    res.send(500).send();
  }
});

// Update a Workspace
router.patch('/workspaces/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'is_organization'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid update!'
    });
  }

  try {
    const workspace = await Workspace.findOne({ _id: req.params.id });

    if (!workspace) {
      return res.status(400).send();
    }

    updates.forEach((update) => workspace[update] = req.body[update]);
    await workspace.save();
    res.send(workspace);
  } catch (e) {
    res.status(400).send(e);
  }
});
// Delete a Workspace
router.delete('/workspaces/:id', auth, async (req, res) => {
  try {
    const workspace = await Workspace.findOneAndDelete({ _id: req.params.id });
    if (!workspace) {
      return res.status(404).send();
    }

    res.send(workspace);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;