const mongoose = require('mongoose');

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
  }
}, {
  timestamps: true
});

const Teams = mongoose.model('Team', teamSchema);

module.exports = Teams;