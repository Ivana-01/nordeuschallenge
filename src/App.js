import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import './styles.css';
import Stats from './components/Statistics.jsx';

function App() {

  return (
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/:user_id' element={<Stats/>} />
      </Routes>
  );
}

export default App;

