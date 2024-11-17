import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import nordeus from '../img/nordeus.png';

const Home = () => {

  const [userId, setUserId] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userId);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: userId }),
      });
      if (!res.ok) {
        console.log("Server error!");
      }
      const data = await res.json(); // Parsiranje odgovora
      setResponse(data); // Čuvanje odgovora
      navigate(`/${userId}`);
    } catch (err) {
      console.log(err.message); // Postavljanje greške
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response === null) {
        console.log('No data received or an error occurred');
    } else {
        console.log('User data:', response);
    }
}, [response]);

  
  

  return (
    <div>
        <div className='container'>
        <h1 className='homeTitle'>Game Stats Dashboard</h1>
        <img src={nordeus} className='nordeus' alt='nordeus logo'/>
        <input 
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className='signInInput'
          type="text"
          placeholder='enter your user ID...'
        />
        <button className='signIn' onClick={handleSubmit}>
          SIGN IN
        </button>
      </div>
    </div>
  )
}

export default Home