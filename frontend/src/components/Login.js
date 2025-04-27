import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the auth context
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username);
    if (!success) {
      setError('Invalid credentials');
    } else {
      // Navigate to the TrailerList page after successful login
      navigate('/trailers');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: 'white', textAlign: 'center' }}>
      <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          style={{ padding: '10px', margin: '10px', width: '200px' }}
        />
        <br />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#03a9f4', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
