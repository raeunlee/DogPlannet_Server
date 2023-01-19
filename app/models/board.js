const mongoose = require('mongoose');
const Comment = require('./Comments');

const boardSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  boardId: {},
  articleId:{},
  dogId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'doginfo',
  },
  title:{
    type: String,
    required: true,
  },
  completed: { type: String, required: true, default: false },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

boardSchema.set('toObject', { virtuals: true });
boardSchema.set('toJSON', { virtuals: true });

boardSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
});

boardSchema.virtual('doginfos', {
    ref: 'doginfo',
    localField: '_id',
    foreignField: 'post',
  });

boardSchema.methods.createPost = function (text) {
  const post = new this({
    text: text,
  });
  return post.save();
};

boardSchema.pre('remove', async function (next) {
  const post = this;
  try {
    await Comment.deleteMany({ post: post._id });
    next();
  } catch (e) {
    next();
  }
});

module.exports = mongoose.model('Post', boardSchema);