const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const github = new Schema({
  userId: String,
  userName: String,
  url: String,
  numRepos: Number,
  bio: String,
  website: String,
  memberSince: Date,
  ghEmail: String,
  savedRepos: []
});

module.exports = mongoose.model('Github', github);

