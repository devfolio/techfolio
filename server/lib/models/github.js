const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const github = new Schema({
  userId: String,
  numCommits: Number,
  numRepos: Number,
  numFollowers: Number,
  memberSince: Date,
  savedRepos: {
    name: String,
    description: String,
    avatar: String,
    html: String,
    collaborators: String, 
    cloneUrl: String,
    numForks: Number
  }
});

module.exports = mongoose.model('Github', github);

