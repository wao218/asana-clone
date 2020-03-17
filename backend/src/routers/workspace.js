const express = require('express');
const Workspace = require('../models/workspace');
const auth = require('../middleware/auth');
const router = new express.Router();

// Create an Workspace
router.post('/workspace', auth, async (req, res) => {
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
// Read an Workspace

// Update an Workspace

// Delete an Workspace


module.exports = router;