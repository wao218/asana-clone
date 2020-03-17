const mongoose = require('mongoose');

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

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;