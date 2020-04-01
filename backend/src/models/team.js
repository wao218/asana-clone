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
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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

// Connect team to project
teamSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'team_id'
});

const Teams = mongoose.model('Team', teamSchema);

module.exports = Teams;