const mongoose = require('mongoose');

const VersionControlSchema = new mongoose.Schema({
  key: String,
  value: Object
}, { timestamps: true });

mongoose.model('VersionControl', VersionControlSchema);