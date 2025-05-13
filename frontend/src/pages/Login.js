import { useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import '../styles/Login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate(location.state?.from || '/', { replace: true });
    }
  }, [user, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate(location.state?.from || '/', { replace: true });
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Login to Your Account</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
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
              <li><strong>Admin:</strong> admin / 2025DEVChallenge</li>
              <li><strong>Editor:</strong> editor / 2025DEVChallenge</li>
              <li><strong>Viewer:</strong> user / 2025DEVChallenge</li>
            </ul>
          </div>
        </div>
      </div>
  );
}