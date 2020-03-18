const mongoose = require('mongoose');
const validator = require('validator');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  workspace_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Workspace'
  },
  team_members: [
    {
      email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid');
        }
      }
    },
    name: {
      type: String,
      trim: true
    }
  }]
}, {
  timestamps: true
});

const Teams = mongoose.model('Team', teamSchema);

module.exports = Teams;