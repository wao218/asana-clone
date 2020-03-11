const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
// add const {sendWelcomeEmail, sendCancellationEmail } = require('../emails/account');
const router = new express.Router();

// Creating a new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    // add sendWelcomeEmail(user.email, user.name);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;