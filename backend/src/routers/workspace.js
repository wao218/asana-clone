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

// Update an Workspace

// Delete an Workspace


module.exports = router;