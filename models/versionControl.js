import mongoose from 'mongoose';

const VersionControlSchema = new mongoose.Schema({
  key: String,
  value: Object
}, { timestamps: true });

module.exports =  mongoose.model('VersionControl', VersionControlSchema);