const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('./Posts');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  googleId: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  }});

UserSchema.pre('remove', async function (next) {
  const user = this;
  try {
    await Post.deleteMany({ userId: user._id });
    next();
  } catch (e) {
    next();
  }
});


module.exports = mongoose.model('User', UserSchema);