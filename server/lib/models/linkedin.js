const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedin = new Schema({
  headline: String,
  position: {
    title: String,
  },
  connections: String,
  pictureUrl: String,
  profileUrl: String
});

module.exports = mongoose.model('LinkedIn', linkedin);