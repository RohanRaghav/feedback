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
      <div className="login-container">
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="userName">User Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
