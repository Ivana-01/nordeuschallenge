const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  event_id: { type: Number, unique: true, required: true },
  event_timestamp: { type: Number, required: true },
  event_type: { type: String, default: 'registration', required: true },
  user_id: { type: String, required: true, unique: true },
  country: { type: String, required: true },
  device: { type: String, required: true, enum: ['iOS', 'Android', 'Web']}
});

module.exports = mongoose.model('User', userSchema);
