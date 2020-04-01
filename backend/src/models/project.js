const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  notes: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true
  },
  current_status: {
    type: String,
    trim: true
  },
  due_date: {
    type: Date
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
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Team'
  }
}, {
  timestamps: true
});


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;