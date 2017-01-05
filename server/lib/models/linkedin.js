const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const linkedin = new Schema({
  headline: String,
  positionTitle: String,
  positionCompany: String,
  positionLocation: String,
  positionSummary: String,
  connections: String,
  pictureUrl: String,
  profileUrl: String
});

module.exports = mongoose.model('LinkedIn', linkedin);