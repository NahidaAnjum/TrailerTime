import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check auth status on mount and handle history
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          'http://localhost:5001/api/auth/check',
          { withCredentials: true }
        );
        
        if (data.isAuthenticated) {
          setUser({
            username: data.username,
            role: data.role,
            id: data.id
          });
          
          // Clear login from history if accessed directly
          if (window.location.pathname === '/login') {
            window.history.replaceState(null, '', '/');
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Block back navigation after login
    const handlePopState = () => {
      if (user && window.location.pathname === '/login') {
        window.history.pushState(null, '', '/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [user]);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      
      setUser(data);
      
      // Replace login route in history
      window.history.replaceState(null, '', '/');
      navigate('/', { replace: true });
    } catch (error) {
      throw error.response?.data?.error || 'Login failed';
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5001/api/auth/logout',
        {},
        { withCredentials: true }
      );
    } finally {
      setUser(null);
      // Clear history and force login page
      window.history.replaceState(null, '', '/login');
      navigate('/login', { replace: true });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;