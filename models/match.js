// models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  event_id: { type: Number, unique: true, required: true },
  event_timestamp: { type: Number, required: true },
  event_type: { type: String, default: 'match', required: true },
  match_id: { type: String, required: true, unique: true },
  home_user_id: { type: String, required: true, unique: true },
  away_user_id: { type: String, required: true, unique: true },
  home_goals_scored: { type: Number, required: true, default: null },
  away_goals_scored: { type: Number, required: true, default: null }
});

module.exports = mongoose.model('Match', matchSchema);
