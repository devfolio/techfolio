const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedin = new Schema({
  userId: String,
  numCommits: Number,
  numRepos: Number,
  numFollowers: Number,
  memberSince: Date,
});

module.exports = mongoose.model('LinkedIn', linkedin);