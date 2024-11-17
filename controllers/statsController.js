const moment = require('moment')
const Match = require('../models/match');
const User = require('../models/user');
const Session = require('../models/session');

exports.getUserStats = async (req, res) => {
  const { user_id } = req.params;
  const now = new Date();
    const offset = now.getTimezoneOffset();
    const localTime = new Date(now.getTime() - offset * 60 * 1000);
    const date = moment(localTime.toISOString().split("T")[0]).format('YYYY-MM-DD HH:mm:ss');
    console.log(user_id, date)
  if (!user_id) {
    return res.status(400).send('user_id is required');
  }
  try {
    const user = await User.findOne({ user_id: user_id });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const registrationDate = moment(user.registration_datetime).format('YYYY-MM-DD HH:mm:ss');
    const lastLogin = await Session.find({ user_id }).sort({ session_end: -1 }).limit(1);
    let daysSinceLastLogin = null;
    if (lastLogin.length > 0) {
      daysSinceLastLogin = moment().diff(moment(lastLogin[0].session_end), 'days');
    }
    let sessions = [];
    if (date) {
      sessions = await Session.find({ user_id, session_start: { $gte: new Date(date) } });
    } else {
      sessions = await Session.find({ user_id });
    }
    let totalTimeSpentInGame = 0;
    let totalSessions = sessions.length;
    sessions.forEach(session => {
      const sessionDuration = moment(session.session_end).diff(moment(session.session_start), 'seconds');
      totalTimeSpentInGame += sessionDuration;
    });
    let matches = [];
    if (date) {
      matches = await Match.find({
        $or: [{ home_user_id: user_id }, { away_user_id: user_id }],
        match_start: { $gte: new Date(date) }
      });
    } else {
      matches = await Match.find({
        $or: [{ home_user_id: user_id }, { away_user_id: user_id }]
      });
    }
    let totalPoints = 0;
    let matchTime = 0;
    matches.forEach(match => {
      if (match.home_user_id === user_id) {
        if (match.home_goals_scored > match.away_goals_scored) {
          totalPoints += 3; // Win
        } else if (match.home_goals_scored === match.away_goals_scored) {
          totalPoints += 1; // Draw
        }
      } else {
        if (match.away_goals_scored > match.home_goals_scored) {
          totalPoints += 3; // Win
        } else if (match.away_goals_scored === match.home_goals_scored) {
          totalPoints += 1; // Draw
        }
      }
      matchTime += moment(match.match_end).diff(moment(match.match_start), 'seconds');
    });

    const totalGameTime = totalTimeSpentInGame + matchTime;
    const matchTimePercentage = totalGameTime ? (matchTime / totalGameTime) * 100 : 0;
    
    res.json({
      user_id,
      country: user.country,
      registration_datetime: registrationDate,
      days_since_last_login: daysSinceLastLogin,
      total_sessions: totalSessions,
      total_time_spent_in_game: totalTimeSpentInGame,
      total_points: totalPoints,
      match_time_percentage: matchTimePercentage.toFixed(2)
    })
  } catch (err) {
    res.status(500).send(err.message);
  }
}
exports.getGameStats = async (req, res) => {
  const user_id = req.params.user_id;
  const now = new Date();
  const offset = now.getTimezoneOffset();
  const localTime = new Date(now.getTime() - offset * 60 * 1000);
  const date = moment(localTime.toISOString().split("T")[0]).format('YYYY-MM-DD HH:mm:ss');
  
    try {
    let sessionsQuery = {};
    if (date) {
      const startOfDay = moment(date).startOf('day').toDate();
      const endOfDay = moment(date).endOf('day').toDate();
      sessionsQuery.session_start = { $gte: startOfDay, $lte: endOfDay };
    }
    const sessions = await Session.find(sessionsQuery);
    const activeUsers = new Set(sessions.map(session => session.user_id));
    const dailyActiveUsersCount = activeUsers.size;
    const totalSessionsCount = sessions.length;

    const usersWithSessions = sessions.reduce((acc, session) => {
      acc[session.user_id] = (acc[session.user_id] || 0) + 1;
      return acc;
    }, {});

    const totalUsersWithSessions = Object.keys(usersWithSessions).length;
    const averageSessionsPerUser = totalUsersWithSessions ? totalSessionsCount / totalUsersWithSessions : 0;

    let matches = [];
    if (date) {
      matches = await Match.find({ match_start: { $gte: moment(date).startOf('day').toDate(), $lte: moment(date).endOf('day').toDate() } });
    } else {
      matches = await Match.find({});
    }

    const userPoints = {};
    matches.forEach(match => {
      if (match.home_goals_scored > match.away_goals_scored) {
        userPoints[match.home_user_id] = (userPoints[match.home_user_id] || 0) + 3;
      } else if (match.home_goals_scored === match.away_goals_scored) {
        userPoints[match.home_user_id] = (userPoints[match.home_user_id] || 0) + 1;
      }
      if (match.away_goals_scored > match.home_goals_scored) {
        userPoints[match.away_user_id] = (userPoints[match.away_user_id] || 0) + 3;
      } else if (match.away_goals_scored === match.home_goals_scored) {
        userPoints[match.away_user_id] = (userPoints[match.away_user_id] || 0) + 1;
      }
    });
    let maxPoints = 0;
    let topUser = null;
    for (const [userId, points] of Object.entries(userPoints)) {
      if (points > maxPoints) {
        maxPoints = points;
        topUser = userId;
      }
    }

    res.json({
      date: date || 'all-time',
      daily_active_users: dailyActiveUsersCount,
      total_sessions: totalSessionsCount,
      average_sessions_per_user: averageSessionsPerUser.toFixed(2),
      top_user: topUser,
      top_user_points: maxPoints
    });
  } catch (err) {
      res.status(500).send(err.message);
    }
  }