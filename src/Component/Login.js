import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store data in localStorage
    localStorage.setItem('teamName', teamName);
    localStorage.setItem('email', email);
    localStorage.setItem('userName', userName);
    
    // Log the stored data to console
    console.log('Stored data in localStorage:');
    console.log('Team Name:', localStorage.getItem('teamName'));
    console.log('Email:', localStorage.getItem('email'));
    console.log('User Name:', localStorage.getItem('userName'));
    
    // Navigate to the feedback page
    navigate('/feedback');
  };

  return (
    <div className="App">
        <header className="hero-section">
            <h1 className="heading">Tekathon 3.0</h1>
            <p className="subheading">Internal hackathon for SIH 2024</p>
          </header>
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div className='efg'>
            <label className='abc' htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              className='def'
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='abc' htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className='def'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='abc' htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              className='def'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <button className='submit' type="submit"><span>Submit</span></button>
        </form>
      </div>
    </div>
  );
};

export default Login;
