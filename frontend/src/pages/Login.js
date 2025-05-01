import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(location.state?.from || '/', { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      // Navigate to previous location or home
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="test-credentials">
        <p>Test Accounts:</p>
        <ul>
          <li>Admin: admin/2025DEVChallenge</li>
          <li>Editor: newuser/2025DEVChallenge</li>
          <li>Viewer: viewer/2025DEVChallenge</li>
        </ul>
      </div>
    </div>
  );
}