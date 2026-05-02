const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  skills: String,
  experience: String,
  location: String
});

module.exports = mongoose.model('Job', jobSchema);