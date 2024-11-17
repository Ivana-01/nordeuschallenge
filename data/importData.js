const fs = require('fs');
const User = require('../models/user');
const Session = require('../models/session');
const Match = require('../models/match');

async function importData() {
    const data = fs.readFileSync('vents.jsonl', 'utf-8').split('\n');
  
    for (const line of data) {
      if (line.trim()) {  // Ignorišemo prazne linije
        const event = JSON.parse(line);
  
        try {
          switch (event.event_type) {
            case 'registration':
              const user = new User({
                user_id: event.event_data.user_id,
                event_id: event.event_id,
                event_timestamp: event.event_timestamp,
                event_type: event.event_type,
                country: event.event_data.country,
                device: event.event_data.device_os
              });
              await user.save();
              console.log(`User saved: ${event.event_data.user_id}`);
              break;
  
            case 'session_ping':
              const session = new Session({
                event_id: event.event_id,
                event_timestamp: event.event_timestamp,
                event_type: event.event_type,
                user_id: event.event_data.user_id,
                type: event.event_data.type
              });
              await session.save();
              console.log(`Session saved: ${event.event_data.user_id}`);
              break;
  
            case 'match':
              const match = new Match({
                event_id: event.event_id,
                event_timestamp: event.event_timestamp,
                event_type: event.event_type,
                match_id: event.event_data.match_id,
                home_user_id: event.event_data.home_user_id,
                away_user_id: event.event_data.away_user_id,
                home_goals_scored: event.event_data.home_goals_scored,
                away_goals_scored: event.event_data.away_goals_scored
              });
              await match.save();
              console.log(`Match saved: ${event.event_data.match_id}`);
              break;
  
            default:
              console.error(`Unknown event type: ${event.event_type}`);
          }
        } catch (err) {
          console.error(`Error saving event: ${err.message}`);
        }
      }
    }
  }

  importData();
