const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('Password cannot contain password');
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  photo: {
    type: Buffer
  }
},
{
  timestamps: true
});

// Connect user to task
userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'assignee_id'
});

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'completed_by_id'
});
// Connect user to project
userSchema.virtual('projects', {
  ref: 'Project',
  localField: '_id',
  foreignField: 'owner_id'
});

// Hide private data / Expose Public data
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.photo;

  return userObject;
}

// Generate user auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 
  process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
}

// Confirm user credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

// Delete user tasks when user is removed
// userSchema.pre('remove', async function (next) {
//   const user = this;
//   await Task.deleteMany({ owner: user._id });
//   next();
// });

const User = mongoose.model('User', userSchema);

module.exports = User;