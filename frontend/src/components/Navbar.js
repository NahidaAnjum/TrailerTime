import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',
      background: '#333',
      color: 'white'
    }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        TrailerTime
      </Link>
      {user ? (
        <div>
          <span style={{ marginRight: '1rem' }}>
            {user.username} ({user.role})
          </span>
          <button 
            onClick={handleLogout}
            style={{
              background: '#ff4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>
          Login
        </Link>
      )}
    </nav>
  );
}