const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  experience: String,
  jobId: String
});

module.exports = mongoose.model('Candidate', candidateSchema);