import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Statistics = () => {

  const [userStats, setUserStats] = useState([]);
  const [gameStats, setGameStats] = useState({});
  const user_id = useParams().user_id;
  console.log(user_id)

    const handleGetUserStats = async () => {
      try {
        await fetch(`http://localhost:5000/api/user_stats/${user_id}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user stats');
          }
        })
        .then(data => {
          setUserStats(data);
          console.log(userStats);
        })
        .catch(error => {
          console.error(error.message);
        });
      } catch (error) {
        console.error(error.message);
      }
  }

  const handleGetGameStats = async () => {
    try {
      await fetch(`http://localhost:5000/game_stats/${user_id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Failed to fetch game stats');
        }
      })
      .then(data => {
        setGameStats(data);
        console.log(gameStats);
      })
      .catch(error => {
        console.error(error.message);
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    handleGetUserStats();
    handleGetGameStats();
    });

  return (
    <div className='statsPage'>
      <h1 className='statsTitle'>Statistics</h1>
      <div className="statsContainer">
      <div className='stats'>
        <h1 className='statsSubtitle'>User stats - {userStats.user_id}</h1>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Country: {userStats.country}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Registration date: {userStats.registration_datetime}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Last login: {userStats.days_since_last_login}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Sessions: {userStats.total_sessions}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Time spent in game: {userStats.total_time_spent_in_game}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Points: {userStats.total_points}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Match time: {userStats.match_time_percentage}</h1>
        </div>
      </div>
      <div className='stats'>
        <h1 className='statsSubtitle'>Game stats</h1>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Daily active users: {gameStats.daily_active_users}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Sessions: {gameStats.total_sessions}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Average number of sessions: {gameStats.average_sessions_per_user}</h1>
        </div>
        <div className='statsBox'>
          <h1 className='statsBoxTitle'>Top user: {gameStats.top_user} - {gameStats.top_user_points} points</h1>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Statistics