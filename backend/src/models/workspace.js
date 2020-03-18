const mongoose = require('mongoose');
const Team = require('./team');

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  is_organization: {
    type: Boolean,
    default: false
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

// Delete workspace teams when workspace is removed
workspaceSchema.pre('remove', async function (next) => {
  const workspace = this;
  await Team.deleteMany({ workspace_id: workspace._id });
  next();
});

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;