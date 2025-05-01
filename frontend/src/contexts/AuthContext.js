import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        }
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const { data } = await axios.post(
        'http://localhost:5001/api/auth/login',
        { username, password },
        { withCredentials: true }
      );
      setUser(data);
      navigate('/');
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
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;