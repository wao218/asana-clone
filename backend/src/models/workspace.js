const mongoose = require('mongoose');
const Team = require('./team');
const Task = require('./task');
const Project = require('./project');

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  is_organization: {
    type: Boolean,
    default: false
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Connect workspace to team
workspaceSchema.virtual('teams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'workspace_id'
});

// Connect workspace to project
workspaceSchema.virtual('project', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'workspace_id'
});

// Delete workspace teams when workspace is removed
workspaceSchema.pre('remove', async function (next) {
  const workspace = this;
  await Team.deleteMany({ workspace_id: workspace._id });
  await Project.deleteMany({ workspace_id: workspace._id });
  await Tasks.deleteMany({ workspace_id: workspace._id});
  next();
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;