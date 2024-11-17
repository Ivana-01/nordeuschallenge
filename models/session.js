const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    event_id: { type: Number, unique: true, required: true },
    event_timestamp: { type: Number, required: true },
    event_type: { type: String, default: 'session_ping', required: true },
    user_id: { type: String, required: true },
    type: { type: String, required: true, enum: ['session_start', 'session_end', `""`] }
});

module.exports = mongoose.model('Session', sessionSchema);